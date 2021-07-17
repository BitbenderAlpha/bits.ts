import { Fault } from "../../../Fault/Fault";
import { HttpClientInterface } from "../../../Http/Client/Interface";
import { WebHttpClient } from "../../../Platform/Web/Http/Client";
import { Result } from "../../../Result/Result";
import { TwitchAuthToken } from "../Auth/Token/Token";
import { TwitchHttpUsersLoader } from "../Http/Users/Loader";
import { TwitchUser } from "./User";


export class TwitchUserLoader {

	private readonly httpUsersLoader: TwitchHttpUsersLoader;

	public constructor(
		private readonly authToken: TwitchAuthToken,
		httpClient: HttpClientInterface = new WebHttpClient(window),
	) {
		this.httpUsersLoader =
			new TwitchHttpUsersLoader(
				httpClient
			);
	}

	public async loadSelf() {
		return (
			(await this.httpUsersLoader.load([], [], this.authToken))
				.map( response => response.body.data)
				.flatMap( users =>
					users[0]
						? Result.Success(users[0])
						: Result.Failure(Fault.Root('No user associated with auth token')) 
				)
				.map( user => new TwitchUser(
					user.id,
					user.login,
					user.display_name,
					user.description
				))
		);
	}

	public async loadByLogin(login: string) {
		return (
			(await this.httpUsersLoader.load([], [login], this.authToken))
				.map( response => response.body.data)
				.test( users => users.length < 2, Fault.Root('Multiple users found'))
				.flatMap( users =>
					users[0]
						? Result.Success(users[0])
						: Result.Failure(Fault.Root('User not found for login', {login})) 
				)
				.map( user => new TwitchUser(
					user.id,
					user.login,
					user.display_name,
					user.description
				))
		);
	}
}