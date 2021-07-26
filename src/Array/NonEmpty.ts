import { Fault } from "../Fault/Fault";
import { Integer } from "../Numeric/Integer/Integer";
import { IntegerRange } from "../Numeric/Range/Integer";
import { Result } from "../Result/Result";

export class NonEmptyArray<T> implements Iterable<T> {

	public constructor(
		public readonly head: T,
		public readonly tail: T[],
	) {}

	public get range() {
		return new IntegerRange(
			Integer.From(0).orDie(),
			Integer.From(this.tail.length).orDie(),
		);
	}

	public get length() {
		return 1 + this.tail.length;
	}

	public get(i: Integer) {
		return (
			Result.FromBoolean(this.range.contains(i))
				.map( () => i.value === 0 ? this.head : this.tail[i.value-1] as T)
				.replaceFailureWith(Fault.Root('Index out of bounds', {index: String(i)}))
		);
	}

	public concat(value: T): NonEmptyArray<T> {
		return new NonEmptyArray<T>(
			this.head,
			this.tail.concat(value),
		)
	}

	public shiftLeft(): [T, NonEmptyArray<T> | null] {
		return [
			this.head,
			NonEmptyArray.FromArray(this.tail)
				.replaceFailureWith(null)
				.value
		];
	}

	public static FromArray<T>(a:T[]) {
		const [head, ...tail] = a;

		if (head === void 0) {
			return Result.Failure(Fault.Root('NonEmptyArray cannot be empty...'));
		}

		return Result.Success(new NonEmptyArray(head, tail));
	}

	public * [Symbol.iterator]() {
		yield this.head;
		for (const element of this.tail) {
			yield element;
		}
	}
}