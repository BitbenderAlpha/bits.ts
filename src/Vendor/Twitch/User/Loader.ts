import { Fault } from "../../../Fault/Fault";
import { HttpClientInterface } from "../../../Http/Client/Interface";
import { WebHttpClient } from "../../../Platform/Web/Http/Client";
import { TwitchAuthToken } from "../Auth/Token/Token";
import { TwitchApiUsersLoader } from "../Api/Users/Loader";
import { TwitchUser } from "./User";

export class TwitchUserLoader {

	private readonly httpUsersLoader: TwitchApiUsersLoader;

	public constructor(
		private readonly authToken: TwitchAuthToken,
		httpClient: HttpClientInterface = new WebHttpClient(window),
	) {
		this.httpUsersLoader =
			new TwitchApiUsersLoader(
				httpClient
			);
	}

	public async loadSelf() {
		return (
			(await this.httpUsersLoader.load([], [], this.authToken))
				.map( response => response.body.data)
				.flatMap( users => 
					users
						.first
						.replaceFailureWith(Fault.Root('No user associated with auth token'))
				)
				.map( user => new TwitchUser(
					user.id,
					user.login,
					user.display_name,
					user.description,
					user.profile_image_url,
				))
		);
	}

	public async loadByLogin(login: string) {
		return (
			(await this.httpUsersLoader.load([], [login], this.authToken))
				.map( response => response.body.data)
				.test( users => users.length < 2, Fault.Root('Multiple users found'))
				.flatMap( users => 
					users
						.first
						.replaceFailureWith(Fault.Root('User not found for login'))
				)
				.map( user =>
					new TwitchUser(
						user.id,
						user.login,
						user.display_name,
						user.description,
						user.profile_image_url,
					)
				)
		);
	}
}