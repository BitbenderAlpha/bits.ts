import { HttpHeaderEntry } from "./Entry";

export class HttpHeaderCollection implements Iterable<HttpHeaderEntry> {

	private constructor(
		private readonly internalObject: { [key: string]: string }
	) {}

	public * [Symbol.iterator](): Iterator<HttpHeaderEntry, any, undefined> {
		for (const [key, value] of Object.entries(this.internalObject)) {
			yield new HttpHeaderEntry(key, value);
		}
	}

	public static Empty =
		new HttpHeaderCollection({})

	public set(key: string, value: string): HttpHeaderCollection {
		return new HttpHeaderCollection({
			...this.internalObject,
			[key]: value,
		});
	}
}