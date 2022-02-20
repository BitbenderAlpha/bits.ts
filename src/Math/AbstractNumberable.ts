
type Numberable =
	number |
	AbstractNumberable;

export class AbstractNumberable {

	protected constructor(
		public readonly value: number
	) {}

	public valueOf() {
		return this.value;
	}

	public lt(n: Numberable) {
		return Number(this) < Number(n); 
	}

	public gt(n: Numberable) {
		return Number(this) > Number(n); 
	}

	public lte(n: Numberable) {
		return Number(this) <= Number(n); 
	}

	public gte(n: Numberable) {
		return Number(this) >= Number(n); 
	}

	public eq(n: Numberable) {
		return Number(this) === Number(n);
	}

	public neq(n: Numberable) {
		return Number(this) !== Number(n);
	}

}