import { NonNegativeInteger, Result } from "../..";

/**
 * Represents an immutable variant of an array
 */
export class List<T> implements Iterable<T> {
	public constructor(
		private readonly array: T[],
	) { }

	public get length() {
		return this.array.length;
	}

	public get(index: NonNegativeInteger): Result<T,null> {
		const maybeElement = this.array[index.value];
		
		if (maybeElement === void 0) {
			return Result.Failure(null);
		}

		return Result.Success(maybeElement);
	}


	public static Empty<T>() {
		return new List<T>([]);
	}

	public get first() {
		return this.get(NonNegativeInteger.From(0).orDie());
	}
	
	public map<U>(doMap: (element:T, index: NonNegativeInteger, list: List<T>) => U) {
		return new List(
			this.array.map( (element, index) =>
				doMap(
					element,
					NonNegativeInteger.From(index).orDie(),
					this,
				),
			),
		);
	}

	public appendElement(element: T) {
		return new List(
			[...this.array, element],
		);
	}

	public appendList(list: List<T>) {
		return new List(this.array.concat(Array.from(list)));
	}

	public prependElement(element: T) {
		return new List(
			[element, ...this.array],
		);
	}

	public * [Symbol.iterator]() {
		for (const element of this.array) {
			yield element;
		}
	}
}