import { Integer } from "../../../Integer/Integer";
import { IntegerRange } from "../../../Range/Integer";
import { Ratio } from "../../../Ratio/Ratio";
import { RandomDistributionInterface } from "../Interface";
import { DefaultRandomSource } from "../../Source/Default";

export class IntegerRangeUniformRandomDistribution implements RandomDistributionInterface<Integer> {

	public constructor(
		public readonly range: IntegerRange,
		private readonly randomSource: RandomDistributionInterface<Ratio> = new DefaultRandomSource(),
	) {}

	public sample() {
		const min = this.range.min.value;
		const max = this.range.max.value;
		const x = Number(this.randomSource.sample());
		return Integer.From(Math.floor((max - min + 1) * x) + min).orDie();
	}

	public * [Symbol.iterator]() {
		while (true) yield this.sample();
	}
}