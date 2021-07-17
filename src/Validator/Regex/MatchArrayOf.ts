import { Result } from "../../Result/Result";
import { AbstractValidator } from "../Abstract";
import { ValidatorInterface } from "../Interface";
import { ObjectOfValidator } from "../ObjectOf";

export class RegexMatchArrayOfValidator<T> extends AbstractValidator<T> {

	public constructor(
		private readonly groupSpec: { [K in keyof T]: ValidatorInterface<T[K]>}
	) {
		super();
	}

	public validate(value: unknown, name: string): Result<T, string> {
		return new ObjectOfValidator({
			groups: new ObjectOfValidator(this.groupSpec)
		})
		.validate(value, name)
		.map( value => value.groups)
	}

}