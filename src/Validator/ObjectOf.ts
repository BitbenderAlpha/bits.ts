import { Result } from "../Result/Result";
import { AbstractValidator } from "./Abstract";
import { ValidatorInterface } from "./Interface";

export class ObjectOfValidator<T> extends AbstractValidator<T> {
	public constructor(
		private readonly spec: { [K in keyof T]: ValidatorInterface<T[K]>}
	) {
		super();
	}

	public validate(input: unknown, name: string): Result<T, string> {

		if (typeof input !== 'object' || input === null) {
			return Result.Failure(`${name} was not a string-keyed object`);
		}
		
		const output: Partial<T> = {}
		for (const key in this.spec) {
			const subName = `${name}['${key}']`;
			const subInput = (input as Partial<T>)[key];
			const validator = this.spec[key];
			const validation = validator.validate(subInput, subName);
			if (validation.failed) {
				return Result.Failure(validation.value as string);
			}
			output[key as keyof T] = validation.value as T[keyof T];
		}

		return Result.Success(output as T);
	}
}