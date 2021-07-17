import { NonNegativeInteger } from "../../Integer/NonNegative";
import { PositiveInteger } from "../../Integer/Positive";
import { Result } from "../../Result/Result";
import { Is } from "../../Validator/Is";

/**
 * Given a,b ∈ ℤ⁺, r = (a:b) = a / (a + b), 0 < r < 1
 */
export class ExclusiveUnitRatio {

	public constructor(
		public readonly a: PositiveInteger,
		public readonly b: PositiveInteger,
	) {}

	public valueOf() {
		return this.a.value / (this.a.value + this.b.value)
	}

	public get value() {
		return this.valueOf();
	}

	// todo "Numeric" base class?
	public lt(n: any) {
		return Number(this) < Number(n); 
	}

	public gt(n: any) {
		return Number(this) > Number(n); 
	}

	public lte(n: any) {
		return Number(this) <= Number(n); 
	}

	public gte(n: any) {
		return Number(this) >= Number(n); 
	}

	public eq(n: any) {
		return Number(this) === Number(n);
	}

	public neq(n: any) {
		return Number(this) !== Number(n);
	}

	public static From(value: unknown, name: string = 'ExclusiveUnitRatio.From input'): Result<ExclusiveUnitRatio, string> {
		return (
			Is.Number.validate(value, name)
				.test( x => x > 0, `${name} was less than or equal to zero`)
				.test( x => x < 1, `${name} was greater than or equal to one`)
				.map( x => {
					// Every float is equal to an integer divided by a power of 2,
					// So keep multiplying by 2 until you find that power.
					let a = x, c = 1;
					while (!Number.isInteger(a)) { c*=2; a*=2 }
					return new ExclusiveUnitRatio(
						NonNegativeInteger.From(a).trustMe(),
						NonNegativeInteger.From(c - a).trustMe(),
					)
				})
		);
	} 
}