import { Result } from "../../../Result/Result";

export class HttpRequestUrlQuery implements Iterable<[string, string]> {

	private constructor(
		private readonly native: URLSearchParams,
	) {}

	public * [Symbol.iterator](): Iterator<[string, string], any, undefined> {
		for (const [key, value] of this.native) {
			yield [key, value];
		}
	}

	public static Empty =
		new HttpRequestUrlQuery(
			new URLSearchParams(),
		);

	public static From(value: unknown, name: string = 'HttpRequestUrlQuery.From input'): Result<HttpRequestUrlQuery, string> {
		switch (typeof value) {
			case 'string':
				return Result.Success(this.FromString(value));
			case 'object':
				return Result.Success(
					value
						? this.FromObject(value)
						: this.Empty,
				);
			default:
				return Result.Failure(`${name} could not be normalized to an HttpRequestUrlQuery`)
		}
	}

	public static FromString(q: string) {
		return new HttpRequestUrlQuery(
			new URLSearchParams(q),
		);
	}

	public static FromObject(record: object) {
		const native = new URLSearchParams();
		for (const [key, value] of Object.entries(record)) {
			native.set(key, String(value));
		}
		return new HttpRequestUrlQuery(native);
	}

	public add(key: string, value: string): HttpRequestUrlQuery {

		const native = new URLSearchParams();

		for (const [key, value] of this.native) {
			native.set(key, value);
		}

		native.set(key, value);

		return new HttpRequestUrlQuery(native);
	}

	public getFirst(key: string): Result<string, null> {
		for ( const [k, v] of this) {
			if (k === key) {
				return Result.Success(v);
			}
		}
		return Result.Failure(null);
	}

	public * getAll(key: string) {
		for (const [k, v] of this) {
			if (k === key) {
				yield v;
			}
		}
	}

	public toString(): string {
		return this.native.toString();
	}

	public get isEmpty(): boolean {
		return Array.from(this.native).length === 0;
	}
}