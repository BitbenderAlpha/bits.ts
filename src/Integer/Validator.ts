import { AbstractValidator } from "../Validator/Abstract";
import { Integer } from "./Integer";

export class IntegerValidator extends AbstractValidator<Integer> {
	public validate(value: unknown, name: string) {
		return Integer.From(value, name);
	}
}