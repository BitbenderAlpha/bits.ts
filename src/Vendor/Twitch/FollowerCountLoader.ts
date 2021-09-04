import { TwitchAuthToken, HttpClientInterface, WebHttpClient } from "../..";
import { TwitchApiFollowsLoader } from "./Api/Follows/Loader";
import { TwitchUser } from "./User/User";

export class TwitchFollowerCountLoader {

	private readonly apiFollowsLoader: TwitchApiFollowsLoader;

	public constructor(
		private readonly authToken: TwitchAuthToken,
		httpClient: HttpClientInterface = new WebHttpClient(window),
	) {
		this.apiFollowsLoader =
			new TwitchApiFollowsLoader(
				httpClient
			);
	}

	public loadFollowerCount(user: TwitchUser) {
		return (
			this.apiFollowsLoader.loadUserFollows('', 1, '',user.id, this.authToken)
				.then( result => result.map( response => response.body.total) )
		);
	}

}