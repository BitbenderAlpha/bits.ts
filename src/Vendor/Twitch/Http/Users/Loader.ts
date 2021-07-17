import { Fault } from "../../../../Fault/Fault";
import { HttpClientInterface } from "../../../../Http/Client/Interface";
import { HttpHeaderCollection } from "../../../../Http/Header/Collection";
import { HttpRequest } from "../../../../Http/Request/Request";
import { HttpRequestUrlQuery } from "../../../../Http/Request/Url/Query";
import { Result } from "../../../../Result/Result";
import { Is } from "../../../../Validator/Is";
import { TwitchAuthToken } from "../../Auth/Token/Token";
import { TwitchHttpFailureResponseError } from "../Error/FailureResponse";
import { TwitchHttpMalformedResponseBodyError } from "../Error/MalformedResponseBody";

export class TwitchHttpUsersLoader {

	private readonly responseBodyValidator =
		Is.Named('TwitchUsersHttpClient Response Body',
			Is.Json.String.Of(
				Is.Object.Of({
					data: Is.Array.Of(
						Is.Object.Of({
							id: Is.String, 
							login: Is.String,
							display_name: Is.String,
							description: Is.String,
							broadcaster_type: 
								Is.Exact.String('')
									.or(Is.Exact.String('partner'))
									.or(Is.Exact.String('affiliate')),
							offline_image_url: Is.String,
							profile_image_url: Is.String,
							type: 
								Is.Exact.String('')
									.or(Is.Exact.String('staff'))
									.or(Is.Exact.String('admin'))
									.or(Is.Exact.String('global_mod')),
							view_count: Is.Number,
							created_at: Is.String,
							email: Is.Optional(Is.String)
						}),
					)
				})
			)
		);

	public constructor(
		private readonly httpClient: HttpClientInterface,
	) {}
	
	/**
	 * @remark If both input arrays are empty, the user that owns the auth token is returned
	 * @param userIds 
	 * @param userLogins 
	 * @param authToken 
	 * @returns 
	 */
	public async load(
		userIds: string[],
		userLogins: string[],
		authToken: TwitchAuthToken,
	) {

		const idOrLoginCount = userIds.length +  userLogins.length;
		if (idOrLoginCount > 100) {
			return Result.Failure(
				Fault.Root('Too many ids/logins were passed to the Twitch http users getter', {
					idOrLoginCount: String(idOrLoginCount),
					userIds: JSON.stringify(userIds),
					userLogins: JSON.stringify(userLogins),
				})
			)
		}

		// Nonstandard Query
		let query = HttpRequestUrlQuery.Empty;
		for (const id of userIds) query = query.add('id', id);
		for (const login of userLogins) query = query.add('login', login);

		return (
			(await this.httpClient.send(
				new HttpRequest(
					'GET',
					`https://api.twitch.tv/helix/users${query.isEmpty ? '' : '?'}${query}`,
					HttpHeaderCollection.Empty
						.set('Authorization', `Bearer ${authToken.value}`)
						.set('Client-Id', authToken.clientId)
				)))
				.flatMap( response =>
					Result.FromBoolean(response.ok)
						.replaceSuccessWith(response)
						.replaceFailureWith(
							new TwitchHttpFailureResponseError(
								response,
							)
						)
				)
				.flatMap( response =>  
					this.responseBodyValidator.validate(response.body)
						.map( body => response.structure(body) )
						.mapFailure( validationError => 
							new TwitchHttpMalformedResponseBodyError(
								validationError,
								response.body,
							)
						)
				)
		);

	}
}


