import { Result } from "../../Result/Result";
import { AbstractValidator } from "../Abstract";

export class TypeOfNumberValidator extends AbstractValidator<number> {
	public validate(value: unknown, name: string) {
		return (
			Result.FromBoolean(typeof value === 'number')
				.replaceSuccessWith(value as number)
				.replaceFailureWith(`${name} was not a number`)
		)
	}
}