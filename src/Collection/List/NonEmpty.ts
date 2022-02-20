import { NonNegativeInteger, PositiveInteger } from "../..";
import { Fault } from "../../Fault/Fault";
import { Result } from "../../Result/Result";
import { List } from "./List";

export class NonEmptyList<T> implements Iterable<T> {

	public constructor(
		public readonly head: T,
		public readonly tail: List<T> = List.Empty<T>(),
	) {}

	public get length() {
		return PositiveInteger.From(1 + this.tail.length).orDie();
	}

	public get(index: NonNegativeInteger) {
		return List.Empty<T>().appendElement(this.head).appendList(this.tail).get(index);
	}

	public appendElement(value: T) {
		return new NonEmptyList<T>(
			this.head,
			this.tail.appendElement(value),
		);
	}

	public shiftLeft(): [T, NonEmptyList<T> | null] {
		return [
			this.head,
			NonEmptyList.From(this.tail)
				.replaceFailureWith(null)
				.value
		];
	}
	
	public static From<T>(iterable: Iterable<T>) {
		const [head, ...tail] = iterable;

		if (head === void 0) {
			return Result.Failure(Fault.Root('NonEmptyList cannot be empty.  I don\'t know what else to tell ya.'));
		}

		return Result.Success(new NonEmptyList(head, new List(tail)));
	}

	public * [Symbol.iterator]() {
		yield this.head;
		for (const element of this.tail) {
			yield element;
		}
	}
}