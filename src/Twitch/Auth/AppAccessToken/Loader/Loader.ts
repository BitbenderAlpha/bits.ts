import { HttpClientError } from "../../../../Http/Client/Error";
import { HttpClientInterface } from "../../../../Http/Client/Interface";
import { HttpRequest } from "../../../../Http/Request/Request";
import { TwitchAuthAppAccessToken } from "../AppAccessToken";
import { TwitchAuthAppAccessTokenLoaderError } from "./Error";

export class TwitchAuthAppAccessTokenLoader {

	public constructor(
		private readonly httpClient: HttpClientInterface
	) {}

	public async load(clientId: string, clientSecret: string): Promise<TwitchAuthAppAccessToken | TwitchAuthAppAccessTokenLoaderError> {
		const request =
			new HttpRequest(
				'POST',
				'https://id.twitch.tv/oauth2/token'
					+ `?client_id=${clientId}`
					+ `&client_secret=${clientSecret}`
					+ '&grant_type=client_credentials',
			)

		const responseOrError = await this.httpClient.send(request);

		if (responseOrError instanceof HttpClientError) {
			const error = responseOrError;
			return new TwitchAuthAppAccessTokenLoaderError(
				`couln't load app access token due to http client error ${error.message}`
			);
		}

		const response = responseOrError;

		try {
			const { access_token, expires_in, token_type } = JSON.parse(response.body);

			if (typeof access_token !== 'string') {
				return new TwitchAuthAppAccessTokenLoaderError('response body.access_token was not a string')
			}

			if (token_type !== 'bearer') {
				return new TwitchAuthAppAccessTokenLoaderError(`response body.token_type was "${token_type}" not "bearer"`)
			}

			if (typeof expires_in !== 'number') {
				return new TwitchAuthAppAccessTokenLoaderError('response body.expires_in was not a number')
			}

			return new TwitchAuthAppAccessToken(
				token_type,
				access_token,
				new Date(Date.now() + 1000 * expires_in),
			);

		} catch (error) {
			return new TwitchAuthAppAccessTokenLoaderError(`Invalid response body ${error}`);
		}
	}
}