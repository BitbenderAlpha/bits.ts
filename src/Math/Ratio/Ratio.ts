import { NonNegativeInteger } from "../Integer/NonNegative";
import { PositiveInteger } from "../Integer/Positive";
import { Result } from "../../Result/Result";

/**
 * Represents a:b = a / (a + b) ∈ (0,1); a,b ∈ ℤ⁺
 */
export class Ratio {

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

	public static From(value: unknown, name: string = 'Ratio.From input'): Result<Ratio, string> {

		if (typeof value !== 'number') {
			return Result.Failure(`${name} must be number`);
		}

		if (value > 1) {
			return Result.Failure(`${name} must be less than 1`);
		}

		if (value < 0) {
			return Result.Failure(`${name} must be greater than 0`);
		}
		
		/**
		 *  x = a / (a + b)
		 * 
		 *  ... solve for a / b ... 
		 * 
		 *  a / b = x / (1 - x)
		 * 
		 * Let k be the power of two sufficient to make x an integer, which is guaranteed to exist.
		 * 
		 *  a / b = ( x / ( 1 - x ) ) * ( 2^k / 2^k ) 
		 * 	      = ( x * 2^k ) / ( ( 1 - x ) * 2^k )
		 * 
		 * a = x * 2^k ∈ ℤ⁺
		 * b = (1 - x) * 2^k ∈ ℤ⁺
		 * 
		 * Therefore,
		 *     a, b can be found via repeated doubling and checking if they are integers.
		 * 
		 * NOTE: This is a linear search.  I attempted a binary search, but it was actually slower.
		 *       I suspect this is because doubling and checking integer status are both extremely
		 *       performant operations.
		 */
		let a = value;
		let b = 1 - value;
		while (!Number.isInteger(a) || !Number.isInteger(b)) { a*=2; b*=2 }
		return Result.Success(
			new Ratio(
				NonNegativeInteger.From(a).orDie(),
				NonNegativeInteger.From(b).orDie(),
			),
		);
	} 
}