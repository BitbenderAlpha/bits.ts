import { Is, HttpClientInterface, TwitchAuthToken, Result, TwitchHttpFailureResponseError, TwitchHttpMalformedResponseBodyError } from "../../../..";
import { HttpHeaderCollection } from "../../../../Http/Header/Collection";
import { HttpRequest } from "../../../../Http/Request/Request";
import { HttpRequestUrlQuery } from "../../../../Http/Request/Url/Query";

export class TwitchApiFollowsLoader {
	private readonly responseBodyValidator =
		Is.Named(
			'Twitch API User Follows Response Body',
			Is.Json.String.Of(
				Is.Object.Of({
					data: Is.Array.Of(
						Is.Object.Of({
							followed_at: Is.String,
							from_id: Is.String,
							from_login: Is.String,
							from_name: Is.String,
							to_id: Is.String,
							to_login: Is.String,
							to_name: Is.String,
						}),
					),
					pagination: Is.Object.Of({
						cursor: Is.Optional(Is.String)
					}),
					total: Is.Number,
				})
			)
		);

	public constructor(
		private readonly httpClient: HttpClientInterface,
	) {}
	
	public async loadUserFollows(
		after: string,
		first: number,
		from_id: string,
		to_id: string,
		authToken: TwitchAuthToken,
	) {
		let query = HttpRequestUrlQuery.Empty;
		if (after) query = query.add('after', after);
		if (first) query = query.add('first', String(first));
		if (from_id) query = query.add('from_id', from_id);
		if (to_id) query = query.add('to_id', to_id);

		return (
			this.httpClient.send(
				new HttpRequest(
					'GET',
					`https://api.twitch.tv/helix/users/follows${query.isEmpty ? '' : '?'}${query}`,
					HttpHeaderCollection.From({
						'Authorization': `Bearer ${authToken.value}`,
						'Client-Id': authToken.clientId,
					}),
				),
			)
			.then( result =>
				result
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
			)
		);
	}

}