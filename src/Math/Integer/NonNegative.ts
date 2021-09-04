import { Integer } from "./Integer";

export class NonNegativeInteger extends Integer {
	public static From(value: unknown, name = 'NonNegativeInteger.From input') {
		return (
			Integer.From(value, name)
				.test(integer => integer.value >= 0, `${name} was negative`)
				.map( integer => new NonNegativeInteger(integer.value) )
		);
	}
}