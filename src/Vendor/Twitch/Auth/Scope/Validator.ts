import { AbstractValidator } from "../../../../Validator/Abstract";
import { ValidatorInterface } from "../../../../Validator/Interface";
import { Is } from "../../../../Validator/Is";
import { TwitchAuthScope } from "./Type";

export class TwitchAuthScopeValidator extends AbstractValidator<TwitchAuthScope> {

	private static readonly validator: ValidatorInterface<TwitchAuthScope> =
		Is.Exact.String('bits:read')
			.or(Is.Exact.String('chat:read'))
			.or(Is.Exact.String('chat:edit'))

	public validate(value: unknown, name: string) {
		return TwitchAuthScopeValidator.validator.validate(value, name);
	}

}