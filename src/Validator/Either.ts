import { Result } from "../Result/Result";
import { ValidatorInterface } from "./Interface";

export class EitherValidator<A,B> implements ValidatorInterface<A|B> {

	public constructor(
		private readonly a: ValidatorInterface<A>,
		private readonly b: ValidatorInterface<B>,
	) {}

	public or<C>(c: ValidatorInterface<C>): ValidatorInterface<A|B|C> {
		return new EitherValidator<A|B,C>(this, c);
	}

	public validate(value: unknown, name: string) {
		const aValidation = this.a.validate(value, name).toUnion();
		if (!aValidation.failed) return Result.Success(aValidation.value);
		const bValidation = this.b.validate(value, name).toUnion();
		if (!bValidation.failed) return Result.Success(bValidation.value);
		return Result.Failure(`${aValidation.value} and ${bValidation.value}`);
	}
}