import { HttpClientInterface } from "../../../../../../Http/Client/Interface"
import { HttpRequest } from "../../../../../../Http/Request/Request"
import { HttpRequestUrlQuery } from "../../../../../../Http/Request/Url/Query"
import { Result } from "../../../../../../Result/Result"
import { Is } from "../../../../../../Validator/Is"
import { TwitchHttpFailureResponseError } from "../../../Error/FailureResponse"
import { TwitchHttpMalformedResponseBodyError } from "../../../Error/MalformedResponseBody"

/**
 * @link https://dev.twitch.tv/docs/authentication/getting-tokens-oauth#oauth-client-credentials-flow
 */
export class TwitchHttpAppAccessAuthTokenLoader {
	
	private bodyValidator =
		Is.Named('TwitchHttpAppAccessAuthTokenClient Response Body',
			Is.Json.String.Of(
				Is.Object.Of({
					token_type: Is.Exact.String('bearer'),
					access_token: Is.String,
					expires_in: Is.Number,
				})
			)
		)

	public constructor(
		private readonly httpClient: HttpClientInterface
	) {}

	public async load(clientId: string, clientSecret: string) {

		const request =
			new HttpRequest(
				'POST',
				`https://id.twitch.tv/oauth2/token?${
					HttpRequestUrlQuery.FromObject({
						client_id: clientId,
						client_secret: clientSecret,
						grant_type: 'client_credentials'
					})
				}`
			)

		return (await this.httpClient.send(request))
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
				this.bodyValidator.validate(response.body)
					.map( body => response.structure(body))
					.mapFailure( validationError => 
						new TwitchHttpMalformedResponseBodyError(
							validationError,
							response.body,
						)
					)
			)
	}
}


