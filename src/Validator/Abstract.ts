import { Result } from "../Result/Result";
import { EitherValidator } from "./Either";
import { ValidatorInterface } from "./Interface";

export abstract class AbstractValidator<T> implements ValidatorInterface<T> {
	abstract validate(value: unknown, name: string): Result<T, string>;

	public or<U>(validator: ValidatorInterface<U>): ValidatorInterface<T|U> {
		return new EitherValidator(this, validator);
	};
}