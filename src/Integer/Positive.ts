import { NonNegativeInteger } from "./NonNegative";

export class PositiveInteger extends NonNegativeInteger {
	public static From(value: unknown, name = 'PositiveInteger.From input') {
		return (
			NonNegativeInteger.From(value, name)
				.test(integer => integer.neq(0), `${name} was zero`)
				.map( integer => new PositiveInteger(integer.value) )
		);
	}
}