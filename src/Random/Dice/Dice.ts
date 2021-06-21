import { IntegerRange } from "../../Range/Integer/Integer";
import { Result } from "../../Result/Result";
import { InvalidSideCountRandomDiceCreationError } from "./Error/Creation/InvalidSideCount";
import { IntegerRangeRandomDistribution } from "../Distribution/Range/Integer";

export class RandomDice {

	private constructor(
		private readonly distribution: IntegerRangeRandomDistribution
	) {}

	public static FromSideCount(
		sides: number,
		languageRandom: () => number = Math.random
	): Result<RandomDice, InvalidSideCountRandomDiceCreationError>{
		return (
			IntegerRange.FromNumbers(1, sides)
				.replaceFailureWith(new InvalidSideCountRandomDiceCreationError(sides))
				.map( range => new IntegerRangeRandomDistribution(range, languageRandom))
				.map( distribution => new RandomDice(distribution))
		);
	}

	public get sideCount(): number {
		return this.distribution.range.max;
	}

	public roll(): number {
		return this.distribution.sample();
	}
}