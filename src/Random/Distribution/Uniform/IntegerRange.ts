import { Integer } from "../../../Integer/Integer";
import { IntegerRange } from "../../../Range/Integer";
import { ExclusiveUnitRatio } from "../../../Ratio/Unit/Exclusive";
import { RandomDistributionInterface } from "../Interface";
import { NativeExlusiveUnitRatioUniformRandomDistribution } from "./NativeExclusiveUnitRatio";

export class IntegerRangeUniformRandomDistribution implements RandomDistributionInterface<Integer> {

	public constructor(
		public readonly range: IntegerRange,
		private readonly exclusiveUnitRatioDistribution:
			RandomDistributionInterface<ExclusiveUnitRatio>
				= new NativeExlusiveUnitRatioUniformRandomDistribution()
	) {}

	public sample() {
		const min = this.range.min.value;
		const max = this.range.max.value;
		const x = Number(this.exclusiveUnitRatioDistribution.sample())
		return (
			Integer.From(Math.floor((max - min + 1) * x) + min).trustMe()
		)
	}

	public * [Symbol.iterator]() {
		while (true) yield this.sample();
	}
}