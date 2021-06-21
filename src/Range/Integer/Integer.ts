import { Result } from "../../Result/Result";
import { IntegerRangeCreationError } from "./Error/Creation/Creation";
import { NonIntegerMaxParameterIntegerRangeCreationError } from "./Error/Creation/NonIntegerParameter/Max";
import { NonIntegerMinParameterIntegerRangeCreationError } from "./Error/Creation/NonIntegerParameter/Min";
import { ReversedParametersIntegerRangeCreationError } from "./Error/Creation/ReversedParameters";

export class IntegerRange {

	private constructor(
		private readonly trustedMinInteger: number,
		private readonly trustedMaxInteger: number,
	) {}

	public get min(): number {
		return this.trustedMinInteger;
	}

	public get max(): number {
		return this.trustedMaxInteger;
	}

	public static FromNumbers(min: number, max: number): Result<IntegerRange, IntegerRangeCreationError> {

		if (!Number.isInteger(min)) {
			return Result.Failure(new NonIntegerMinParameterIntegerRangeCreationError(min));
		}

		if (!Number.isInteger(max)) {
			return Result.Failure(new NonIntegerMaxParameterIntegerRangeCreationError(max));
		}

		if (min > max) {
			return Result.Failure(new ReversedParametersIntegerRangeCreationError(min, max));
		}

		return Result.Success(new IntegerRange(min, max));
	}
}