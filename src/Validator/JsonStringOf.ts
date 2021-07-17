import { Result } from "../Result/Result";
import { AbstractValidator } from "./Abstract";
import { ValidatorInterface } from "./Interface";
import { TypeOfStringValidator } from "./TypeOf/String";

export class JsonStringOfValidator<T> extends AbstractValidator<T> {

	public constructor(
		private readonly parsedJsonValidator: ValidatorInterface<T>
	) {
		super();
	}

	public validate(input: unknown, name: string) {

		const stringValidation =
			new TypeOfStringValidator()
				.validate(input, name).toUnion();
		if (stringValidation.failed) {
			return Result.Failure(stringValidation.value);
		}

		try {
			return this.parsedJsonValidator.validate(
				JSON.parse(stringValidation.value) as unknown, // TODO wrap and inject JSON.parse
				`JSON.parse(${name})`
			);
		} catch (error) {
			return Result.Failure(`${name} was not a valid JSON string`)
		}
	}
}