export class StringableSet<T extends string|number|{toString():string}> implements Iterable<T> {

	private constructor(
		private readonly uniquelyStringify: (t: T) => string = String,
		private readonly map: Record<string, T> = {},
	) { }

	public static Empty<T>(uniquelyStringify: (t:T) => string = String) {
		return new StringableSet<T>(uniquelyStringify);
	}

	public has(value: T) {
		return !!this.map[this.uniquelyStringify(value)];
	}
	
	public add(value: T) {
		const key = this.uniquelyStringify(value);
		
		if (key in this.map) {
			return this;
		}

		const nextMap = {...this.map, [key]: value}

		return new StringableSet(
			this.uniquelyStringify,
			nextMap,
		);
	}

	public remove(value: T) {
		const key = this.uniquelyStringify(value);
		
		if (!(key in this.map)) {
			return this;
		}

		const nextMap = { ...this.map };

		delete nextMap[key];

		return new StringableSet(
			this.uniquelyStringify,
			nextMap,
		);

	}

	public get size() {
		return Object.keys(this.map).length;
	} 

	public * [Symbol.iterator] () {
		yield * Object.values(this.map);
	}
}