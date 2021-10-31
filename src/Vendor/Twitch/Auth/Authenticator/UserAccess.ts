import { HttpRequestUrlQuery } from "../../../../Http/Request/Url/Query";
import { Is } from "../../../../Validator/Is";
import { TwitchAuthScope } from "../Scope/Type";
import { TwitchAuthScopeValidator } from "../Scope/Validator";
import { TwitchUserAccessAuthToken } from "../Token/UserAccess";

const hashParamValidator = 
	Is.Named(
		'Twitch user access auth token implicit code flow hash parameters',
		Is.Object.Of({
			token_type: Is.Exact.String('bearer'),
			access_token: Is.String,
			scope: Is.List.Of(new TwitchAuthScopeValidator()),
			state: Is.String,
		}),
	);

export class TwitchUserAccessAuthenticator {
	
	public constructor(
		private readonly webGlobal = window,
	) {}

	public static BuildAuthPageUrl(
		clientId: string,
		redirectUri: string,
		scopes: TwitchAuthScope[],
		forceVerify: boolean = false,
		state: string = '',
	) {
		return `https://id.twitch.tv/oauth2/authorize?${
			HttpRequestUrlQuery.FromObject({
				client_id: clientId,
				redirect_uri: redirectUri,
				response_type: 'token',
				scope: scopes.join(' '),
				force_verify: forceVerify,
				state,
			})
		}`
	}

	/**
	 * TODO: do something with `state`
	 */
	public authenticate(
		clientId: string,
		redirectUri: string,
		scopes: TwitchAuthScope[],
		forceVerify: boolean = false,
		state: string = '',
	): TwitchUserAccessAuthToken {

		const hashParams = HttpRequestUrlQuery.FromString(this.webGlobal.location.hash.slice(1));

		const authParamValidation =
			hashParamValidator
				.validate({
					token_type: hashParams.getFirst('token_type').value,
					access_token: hashParams.getFirst('access_token').value,
					scope: hashParams.getFirst('scope').replaceFailureWith('').value.split(' '),
					state: hashParams.getFirst('state').replaceFailureWith('').value,
				})
				.toUnion();

		if (authParamValidation.failed) {
			const authPageUrl = 
				TwitchUserAccessAuthenticator.BuildAuthPageUrl(
					clientId,
					redirectUri,
					scopes,
					forceVerify,
					state
				);

			this.webGlobal.location.href = authPageUrl;

			throw new Error(`Well this is awkward... you should have redirected to ${authPageUrl}`);
		}

		const {
			token_type,
			access_token,
			scope,
		} = authParamValidation.value

		return new TwitchUserAccessAuthToken(
			clientId,
			token_type,
			access_token,
			scope,
		);
	}
}
