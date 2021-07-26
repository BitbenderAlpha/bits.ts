import { Is } from "../../Validator/Is";

export class Integer {

	protected constructor(
		public readonly value: number
	) {}

	public valueOf() {
		return this.value;
	}

	public lt(n: Integer|number) {
		return Number(this) < Number(n); 
	}

	public gt(n: Integer|number) {
		return Number(this) > Number(n); 
	}

	public lte(n: Integer|number) {
		return Number(this) <= Number(n); 
	}

	public gte(n: Integer|number) {
		return Number(this) >= Number(n); 
	}

	public eq(n: unknown) {
		return Number(this) === Number(n);
	}

	public neq(n: unknown) {
		return Number(this) !== Number(n);
	}

	public static From(value: unknown, name = 'Integer.From input') {
		return (
			Is.Number.validate(value, name)
				.test(Number.isInteger, `${name} was not an integer`)
				.map( value => new Integer(value) )
		);
	}

}