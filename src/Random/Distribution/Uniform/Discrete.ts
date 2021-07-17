import { NonEmptyArray } from "../../../Array/NonEmpty";
import { ExclusiveUnitRatio } from "../../../Ratio/Unit/Exclusive";
import { RandomDistributionInterface } from "../Interface";
import { IntegerRangeUniformRandomDistribution } from "./IntegerRange";
import { NativeExlusiveUnitRatioUniformRandomDistribution } from "./NativeExclusiveUnitRatio";

export class DiscreteRandomDistribution<T> implements RandomDistributionInterface<T> {

	private readonly indexDistribution: IntegerRangeUniformRandomDistribution;

	public constructor(
		private readonly values: NonEmptyArray<T>,
		exclusiveUnitRatioDistribution:
			RandomDistributionInterface<ExclusiveUnitRatio>
				= new NativeExlusiveUnitRatioUniformRandomDistribution()
	) {
		this.indexDistribution =
			new IntegerRangeUniformRandomDistribution(
				this.values.range,
				exclusiveUnitRatioDistribution,
			);
	}

	public sample(): T {
		return this.values.get(this.indexDistribution.sample()).trustMe()
	}

	public * [Symbol.iterator]() {
		while (true) yield this.sample();
	}
	
}