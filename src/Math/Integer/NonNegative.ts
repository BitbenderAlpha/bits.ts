import { AbstractNumberable } from "../AbstractNumberable";
import { Integer } from "./Integer";

export class NonNegativeInteger extends AbstractNumberable {

	public static readonly Zero = new NonNegativeInteger(0);
	public static readonly One = new NonNegativeInteger(1);

	public static From(value: unknown, name = 'NonNegativeInteger.From input') {
		return (
			Integer.From(value, name)
				.test(integer => integer.value >= 0, `${name} was negative`)
				.map( integer => new NonNegativeInteger(integer.value) )
		);
	}

	// All Non-Negative Integers are Integers
	public toInteger() {
		return new Integer(Number(this.value));
	}

	// Technically this could fail, but I'm not worried about that edge case at the moment.
	public inc() {
		return new NonNegativeInteger(this.value + 1);
	}

}