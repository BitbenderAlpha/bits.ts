import { Result } from "..";
import { NonEmptyArray } from "../Array/NonEmpty";
import { AbstractValidator } from "./Abstract";
import { ValidatorInterface } from "./Interface";

export class NonEmptyArrayOfValidator<T> extends AbstractValidator<NonEmptyArray<T>> {

	public constructor(
		private readonly elementValidator: ValidatorInterface<T>,
	) {
		super();
	}

	public validate(value: unknown, name: string): Result<NonEmptyArray<T>, string> {

		if (!Array.isArray(value)) {
			return Result.Failure(`${name} was not an array`);
		}

		const [head, ...tail] = value;

		if (head === void 0) {
			return Result.Failure(`${name} cannot be an empty array`); 
		}

		const headValidation = this.elementValidator.validate(head, `${name}[0]`).toUnion();

		if (headValidation.failed) {
			return Result.Failure(headValidation.value);
		}

		let output = new NonEmptyArray(headValidation.value);

		for (let i = 0; i < tail.length; i++) {
			const validation = this.elementValidator.validate(value[i], `${name}[${i+1}]`).toUnion();
			if (validation.failed) {
				return Result.Failure(validation.value);
			} else {
				output = output.concat(validation.value)
			}
		}

		return Result.Success(output);
	}
}