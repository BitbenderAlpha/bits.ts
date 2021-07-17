import { IterableEventEmitter } from "../../../../Event/Emitter/Iterable";
import { HttpClientInterface } from "../../../../Http/Client/Interface";
import { IrcV3Parser } from "../../../../Irc/V3/Parser";
import { WebHttpClient } from "../../../../Platform/Web/Http/Client";
import { WebSocket } from "../../../../Platform/Web/Socket";
import { Result } from "../../../../Result/Result";
import { SocketClosedEvent } from "../../../../Socket/Event/Closed";
import { SocketErrorEvent } from "../../../../Socket/Event/Error";
import { SocketMessageReceivedEvent } from "../../../../Socket/Event/MessageReceived";
import { SocketOpenedEvent } from "../../../../Socket/Event/Opened";
import { TwitchAuthScope } from "../../Auth/Scope/Type";
import { TwitchUserAccessAuthToken } from "../../Auth/Token/UserAccess";
import { TwitchUserLoader } from "../../User/Loader";
import { TwitchUser } from "../../User/User";
import { TwitchChatMessage } from "../Message";
import { TwitchChatClientError } from "./Error";


class TwitchChatClientConnection {
	public constructor(
		public readonly broadcaster: TwitchUser,
		public readonly send: (message: string) => void,
		public readonly messages: AsyncIterable<TwitchChatMessage>,
	) {}
}

export class TwitchChatClient {

	private static readonly ircParser = new IrcV3Parser();

	// todo: consider making the socket configurable?
	private readonly socket = new WebSocket('wss://irc-ws.chat.twitch.tv/', ['irc']);

	public static readonly READ_AUTH_SCOPE: TwitchAuthScope = 'chat:read';

	public static readonly WRITE_AUTH_SCOPE: TwitchAuthScope = 'chat:edit';
	
	private readonly userLoader: TwitchUserLoader;

	public readonly errors = new IterableEventEmitter<TwitchChatClientError>();

	private readonly cache: Record<string, undefined | {
		messagesEventEmitter: IterableEventEmitter<TwitchChatMessage>,
		connection: TwitchChatClientConnection,
	}> = {}

	private isInitialized: boolean = false;

	public constructor(
		private readonly userAccessAuthToken: TwitchUserAccessAuthToken,
		httpClient: HttpClientInterface = new WebHttpClient(window),
	) {
		this.userLoader =
			new TwitchUserLoader(
				userAccessAuthToken,
				httpClient,
			)
	}

	public async connect(broadcaster: TwitchUser): Promise<Result<TwitchChatClientConnection, TwitchChatClientError>> {

		if (!this.isInitialized) {
			const initialization = (await this.initialize()).toUnion()
			if (initialization.failed) {
				return Result.Failure(initialization.value);
			}
		}

		// See if we already have a connection to this broadcaster's chat
		const cached = this.cache[broadcaster.loginName];
		if (cached) {
			return Result.Success(cached.connection);
		}
		
		this.socket.send(`JOIN #${broadcaster.loginName}`);

		const messagesEventEmitter = new IterableEventEmitter<TwitchChatMessage>();

		const connection =
			new TwitchChatClientConnection(
				broadcaster,
				(message: string) => {
					// todo: sanitize message
					this.socket.send(`PRIVMSG #${broadcaster.loginName} :${message}`)
				},
				{
					async * [Symbol.asyncIterator]() {
						for await (const m of messagesEventEmitter) yield m;
					}
				},
			);

		this.cache[broadcaster.loginName] = {
			connection,
			messagesEventEmitter,
		};

		return Result.Success(connection);
	}

	/**
	 * note -- this does not yet properly handle IRC unhappy path concerns. or timeout issues.  Good luck!
	 */
	private initialize(): Promise<Result<true, TwitchChatClientError>> {

		// This is just WILD
		return new Promise<Result<true, TwitchChatClientError>>( async (resolve, reject) => {

			// Shouldn't happen... but just in case...
			if (this.isInitialized) {
				return resolve(Result.Success(true));
			}

			const attemptToLoadIdentity =
				(await this.userLoader.loadSelf()).toUnion();

			if (attemptToLoadIdentity.failed) {
				return resolve(
					Result.Failure(
						new TwitchChatClientError(
							'Failed to load chatter identity from authorization token',
							attemptToLoadIdentity.value,
						),
					)
				);
			}

			const identity = attemptToLoadIdentity.value;

			this.socket.open();

			// Yes, this is a (potentially) infinite loop inside a promise closure.
			for await (const event of this.socket) {

				if (event instanceof SocketOpenedEvent) {
					this.socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
					this.socket.send(`PASS oauth:${this.userAccessAuthToken.value}`);
					this.socket.send(`NICK ${identity.loginName}`);

					// Make sure we re-listen on reconnect
					for (const broadcasterLoginName in this.cache) {
						this.socket.send(`JOIN #${broadcasterLoginName}`);
					}

					if (!this.isInitialized) {
						this.isInitialized = true;
						resolve(Result.Success(true));
					}
				}

				if (event instanceof SocketMessageReceivedEvent) {
		
					for (const message of TwitchChatClient.ircParser.parse(event.message)) {
		
						if (message.command === 'PING') {
							this.socket.send(`PONG :${message.parameters[0]}`)
						}
		
						if (message.command === 'PRIVMSG') {
	
							// todo: extract other metadata from tags
							const channelName = (message.parameters[0] || '').slice(1);

							const cached = this.cache[channelName];
							if (cached) {
								const senderDisplayName =  (message.tags['display-name'] || '');
								const messageText = (message.parameters[1] || '').toLowerCase().trim();
								cached.messagesEventEmitter.emit(
									new TwitchChatMessage(
										senderDisplayName,
										messageText,
									)
								)
							} else {
								this.errors.emit(
									new TwitchChatClientError(
										`Received PRIVMSG for channel #${channelName}, which you were not listening for...`
									)
								)
							}
						}
					}
				}
		
				if (event instanceof SocketErrorEvent) {

					if (!this.isInitialized) {
						reject(
							Result.Failure(
								new TwitchChatClientError(
									'Socket error encountered before initialization could complete',
									event,
								)
							)
						)
					}

					this.errors.emit(new TwitchChatClientError('Socket Error Encountered', event));
				}
		
				if (event instanceof SocketClosedEvent) {
					// should I have a ".warnings" too?
					this.errors.emit(new TwitchChatClientError('Reconnecting...'))
					// TODO: exponential backoff
					this.socket.open()
				}
			}
		});
	}
}