import { Integer } from "../Integer/Integer";

export class IntegerRange {
	public readonly max: Integer;
	public readonly min: Integer;

	public constructor(
		a: Integer,
		b: Integer,
	) {
		this.min = a.lte(b) ? a : b;
		this.max = a.gte(b) ? a : b;
	}

	public contains(i: Integer): boolean {
		return i.gte(this.min) && i.lte(this.max);
	}
}