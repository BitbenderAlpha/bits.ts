import { Result } from "../../Result/Result";
import { AbstractValidator } from "../Abstract";

export class TypeOfUndefinedValidator extends AbstractValidator<undefined> {
	public validate(value: unknown, name: string) {
		return (
			Result.FromBoolean(typeof value === 'undefined')
				.replaceSuccessWith(undefined)
				.replaceFailureWith(`${name} was not undefined`)
		)
	}
}