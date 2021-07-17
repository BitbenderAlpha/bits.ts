import { Result } from "../../Result/Result";
import { AbstractValidator } from "../Abstract";

export class TypeOfStringValidator extends AbstractValidator<string> {
	public validate(value: unknown, name: string) {
		return (
			Result.FromBoolean(typeof value === 'string')
				.replaceSuccessWith(value as string)
				.replaceFailureWith(`${name} was not a string`)
		)
	}
}