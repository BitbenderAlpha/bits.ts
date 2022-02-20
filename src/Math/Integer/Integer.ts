import { Result } from "../../Result/Result";
import { AbstractNumberable } from "../AbstractNumberable";

export class Integer extends AbstractNumberable {

	public static NegativeOne = Integer.From(-1).orDie();
	public static Zero = Integer.From(0).orDie();
	public static One = Integer.From(1).orDie();

	public static From(value: unknown, name = 'Integer.From input') {
		return (
			Result.Success(value)
				.test( x => typeof x === 'number', `${name} must be a number`)
				.test(Number.isInteger, `${name} must be an integer`)
				.map( value => new Integer(value as number) )
		);
	}

}