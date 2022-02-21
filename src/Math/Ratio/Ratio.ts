import { PositiveInteger } from "../Integer/Positive";
import { Result } from "../../Result/Result";
import { AbstractNumberable } from "../AbstractNumberable";

/**
 * Represents a:b = a / (a + b) ∈ (0,1); a,b ∈ ℤ⁺
 */
export class Ratio extends AbstractNumberable {

	public constructor(
		public readonly a: PositiveInteger,
		public readonly b: PositiveInteger,
	) {
		super(Number(a) / (Number(a) + Number(b)));
	}

	public static readonly Min =
		new Ratio(
			PositiveInteger.One,
			PositiveInteger.From((Number.MAX_SAFE_INTEGER-1)/2).orDie(),
		);

	public static readonly Half =
		new Ratio(
			PositiveInteger.One,
			PositiveInteger.One,
		);

	public static readonly Max =
		new Ratio(
			PositiveInteger.From((Number.MAX_SAFE_INTEGER-1)/2).orDie(),
			PositiveInteger.One,
		);


	public static From(value: unknown, name: string = 'Ratio.From input'): Result<Ratio, string> {

		if (typeof value !== 'number') {
			return Result.Failure(`${name} must be number`);
		}

		if (Ratio.Max.lt(value)) {
			return Result.Failure(`${name} must be less than ${Ratio.Max}`);
		}

		if (Ratio.Min.gt(value)) {
			return Result.Failure(`${name} must be greater than ${Ratio.Min}`);
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
				PositiveInteger.From(a).orDie(),
				PositiveInteger.From(b).orDie(),
			),
		);
	} 

	public static Clamp(value: number) {
		if (isNaN(Number(value))) return Ratio.Half;
		if (Ratio.Max.lt(value)) return Ratio.Max;
		if (Ratio.Min.gt(value)) return Ratio.Min;
		return Ratio.From(value).orDie();
	}
}