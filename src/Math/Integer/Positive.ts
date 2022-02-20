import { AbstractNumberable } from "../AbstractNumberable";
import { Integer } from "./Integer";
import { NonNegativeInteger } from "./NonNegative";

export class PositiveInteger extends AbstractNumberable {

	public static readonly One = PositiveInteger.From(1).orDie();
	public static readonly Two = PositiveInteger.From(2).orDie();

	public static From(value: unknown, name = 'PositiveInteger.From input') {
		return (
			NonNegativeInteger.From(value, name)
				.test(integer => integer.neq(0), `${name} was zero`)
				.map( integer => new PositiveInteger(integer.value) )
		);
	}

	// All Positive Integers are Integers
	public toInteger() {
		return new Integer(Number(this.value));
	}

	// All Positive Integers are Non-Negative Integers
	public toNonNegativeInteger() {
		return new NonNegativeInteger(Number(this.value));
	}
}