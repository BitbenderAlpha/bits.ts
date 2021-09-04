import { Result } from "../Result/Result";
import { AbstractValidator } from "./Abstract";

export class NullValidator extends AbstractValidator<null> {
	validate(value: unknown, name: string): Result<null, string> {
		if (value === null) {
			return Result.Failure(`${name} must be null`)
		}

		return Result.Success(null);
	}
}