import { Fault } from "../../Fault/Fault";
import { Result } from "../../Result/Result";

export class Byte {
	private constructor(
		private readonly trustedNumber: number,
	) {}

	public static From(value: unknown, name: string = 'Byte.From input value'): Result<Byte, Fault> {
		const number = Number(value);
		if (isNaN(number)) return Result.Failure(Fault.Root(`${name} could not be converted to a number`));
		if (!Number.isInteger(number)) return Result.Failure(Fault.Root(`${name} was not an integer`));
		if (number < 0) return Result.Failure(Fault.Root(`${name} was negative`));
		if (number > 255) return Result.Failure(Fault.Root(`${name} was too large to fit in a byte`));
		return Result.Success(new Byte(number));
	}

	public static FromHexString(maybeHexString: string, name: string = 'Byte.FromHexString input value'): Result<Byte, Fault> {
		return (
			Result.FromBoolean(/^[0-9a-f]{2}$/.test(maybeHexString))
				.replaceFailureWith(Fault.Root(`${name} is not a valid two-character hex string`))
				.map( () => parseInt(maybeHexString, 16))
				.flatMap(Byte.From)
		);
	}

	public get value() {
		return this.valueOf();
	}

	public valueOf() {
		return this.trustedNumber;
	}

	public toHexString() {
		return this.trustedNumber.toString(16).padStart(2, '0');
	}
	
}