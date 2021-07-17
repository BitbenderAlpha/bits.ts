import { HttpHeaderEntry } from "./Entry";

export class HttpHeaderCollection implements Iterable<HttpHeaderEntry> {

	private constructor(
		private readonly internalRecord: Record<string, string>
	) {}

	public * [Symbol.iterator](): Iterator<HttpHeaderEntry, any, undefined> {
		for (const [key, value] of Object.entries(this.internalRecord)) {
			yield new HttpHeaderEntry(key, value);
		}
	}

	public static Empty =
		new HttpHeaderCollection({})

	public static From(record: Record<string,string>) {
		return new HttpHeaderCollection({...record});
	}

	public set(key: string, value: string): HttpHeaderCollection {
		return new HttpHeaderCollection({
			...this.internalRecord,
			[key]: value,
		});
	}
}