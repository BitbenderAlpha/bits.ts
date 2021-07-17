
/**
 * Basically just wraps AsyncIterable
 */
export class Signal<T> implements AsyncIterable<T> {

	public constructor(
		private readonly asyncIterable: AsyncIterable<T>,
	) {}

	public static From<T>(asyncIterable: AsyncIterable<T>) {
		return new Signal<T>(asyncIterable);
	}

	async * [Symbol.asyncIterator](): AsyncIterableIterator<T> {
		for await (const element of this.asyncIterable) yield element; 
	}

	public map<U>(mapper: (element: T) => U): Signal<U> {
		const elements = this.asyncIterable;
		return new Signal<U>({
			async * [Symbol.asyncIterator](): AsyncIterableIterator<U> {
				for await (const element of elements) yield mapper(element); 
			}
		});
	}

	public async devour() {
		const iterator = this.asyncIterable[Symbol.asyncIterator]();
		while (!(await iterator.next()).done);
	}

}