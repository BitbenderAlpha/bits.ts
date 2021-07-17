import { AbstractValidator } from "./Abstract";
import { ValidatorInterface } from "./Interface";

export class FixedNameValidator<T> extends AbstractValidator<T> {

	public constructor(
		private readonly name: string,
		private readonly validator: ValidatorInterface<T>
	) {
		super();
	}

	public validate(value: unknown) {
		return this.validator.validate(value, this.name);
	}
	
}