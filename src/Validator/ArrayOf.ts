import { Result } from "../Result/Result";
import { AbstractValidator } from "./Abstract";
import { ValidatorInterface } from "./Interface";

export class ArrayOfValidator<T> extends AbstractValidator<T[]> {
	public constructor(
		private readonly elementValidator: ValidatorInterface<T>,
		private readonly minLength = 0,
		private readonly maxLength = Infinity,
	) {
		super();
	}

	public validate(input: unknown, name: string): Result<T[], string> {

		if (!Array.isArray(input)) {
			return Result.Failure(`${name} was not an array`);
		}

		if (input.length < this.minLength) {
			return Result.Failure(`${name} had ${input.length} elements, which is less than the minimum of ${this.minLength}`);
		}

		if (input.length > this.maxLength) {
			return Result.Failure(`${name} had ${input.length} elements, which is more than the maximum of ${this.maxLength}`);
		}
		
		return input.reduce(
			(output: Result<T[],string>, element: unknown, index: number) =>
			output.flatMap( validatedElements => 
				this.elementValidator
					.validate(element, `${name}[${index}]`)
					.map( validatedElement => [
						...validatedElements,
						validatedElement
					])
			), 
			Result.Success([])
		);
	}
}