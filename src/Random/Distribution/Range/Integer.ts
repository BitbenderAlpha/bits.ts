import { IntegerRange } from "../../../Range/Integer/Integer";
import { RandomDistributionInterface } from "../Interface";

export class IntegerRangeRandomDistribution implements RandomDistributionInterface<number> {

	public constructor(
		public readonly range: IntegerRange,
		private readonly languageRandom: () => number = Math.random,
	) {}

	public sample(): number {
		return Math.floor(
			(this.range.max - this.range.min + 1)
			* 
			this.languageRandom()
		) 
		+ 
		this.range.min;
	}
}