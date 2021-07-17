export class TwitchChatClientError {
	public constructor(
		public readonly message: string,
		public readonly cause?: any, // todo I don't love this
	) {}
}