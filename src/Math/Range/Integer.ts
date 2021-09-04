import { Integer } from "../Integer/Integer";

export class IntegerRange implements Iterable<Integer> {
	public readonly max: Integer;
	public readonly min: Integer;

	public constructor(
		a: Integer,
		b: Integer,
	) {
		this.min = a.lte(b) ? a : b;
		this.max = a.gte(b) ? a : b;
	}

	public * [Symbol.iterator](): Iterator<Integer, any, undefined> {
		for (let i = Number(this.min); i<=Number(this.max); i++) {
			yield Integer.From(i).orDie();
		}
	}

	public contains(i: Integer): boolean {
		return i.gte(this.min) && i.lte(this.max);
	}
}