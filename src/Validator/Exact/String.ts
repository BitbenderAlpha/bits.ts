import { Result } from "../../Result/Result";
import { AbstractValidator } from "../Abstract";

export class ExactStringValidator<T extends string> extends AbstractValidator<T>{

	public constructor(
		private readonly comparisonValue: T
	) {
		super();
	}

	public validate(value: unknown, name: string) {

		if (value !== this.comparisonValue) {
			return Result.Failure(`${name} was not equal to ${typeof this.comparisonValue} '${this.comparisonValue}'`)
		}

		return Result.Success(this.comparisonValue);
	}
}