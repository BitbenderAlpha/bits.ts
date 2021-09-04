import { HttpClientInterface } from "../../../../Http/Client/Interface";
import { TwitchHttpAppAccessAuthTokenLoader } from "../../Api/Auth/Token/AppAccess/Loader";
import { TwitchAppAccessAuthToken } from "../Token/AppAccess";

export class TwitchAppAccessAuthenticator {

	httpLoader: TwitchHttpAppAccessAuthTokenLoader;

	public constructor(
		httpClient: HttpClientInterface,
		public readonly nowSource: () => number = Date.now, // todo: replace this when you build the Time module
	) {
		this.httpLoader = new TwitchHttpAppAccessAuthTokenLoader(httpClient)
	}

	public async authenticate(
		clientId: string,
		clientSecret: string,
	) {
		return (
			(await this.httpLoader.load(clientId, clientSecret))
				.map( response => response.body )
				.map( token =>
					new TwitchAppAccessAuthToken(
						clientId,
						token.token_type,
						token.access_token,
						new Date(
							this.nowSource()
							+ 1000 * token.expires_in
						),
					)
				)
		);
	}
}