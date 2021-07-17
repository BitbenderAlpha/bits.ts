import { Fault } from "../Fault/Fault";
import { Integer } from "../Integer/Integer";
import { IntegerRange } from "../Range/Integer";
import { Result } from "../Result/Result";

export class NonEmptyArray<T> implements Iterable<T> {

	public constructor(
		public readonly head: T,
		public readonly tail: T[],
	) {}

	public get range() {
		return new IntegerRange(
			Integer.From(0).trustMe(),
			Integer.From(this.tail.length).trustMe(),
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

	public static FromArray<T>(a:T[]) {
		const [head, ...tail] = a;
		return (
			Result.FromBoolean(typeof head !== undefined)
				.replaceSuccessWith(new NonEmptyArray(head as T, tail))
				.replaceFailureWith(Fault.Root('NonEmptyArray cannot be empty...'))
		);
	}

	public * [Symbol.iterator]() {
		yield this.head;
		for (const element of this.tail) {
			yield element;
		}
	}
}