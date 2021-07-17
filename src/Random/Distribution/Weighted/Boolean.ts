import { ExclusiveUnitRatio } from "../../../Ratio/Unit/Exclusive";
import { RandomDistributionInterface } from "../Interface";
import { NativeExlusiveUnitRatioUniformRandomDistribution } from "../Uniform/NativeExclusiveUnitRatio";

export class WeightedBooleanRandomDistribution implements RandomDistributionInterface<boolean> {

	public constructor(
		private readonly trueThreshold: ExclusiveUnitRatio,
		private readonly exclusiveUnitRatioDistribution:
			RandomDistributionInterface<ExclusiveUnitRatio>
				= new NativeExlusiveUnitRatioUniformRandomDistribution()
	) {}
	
	public sample(): boolean {
		return this.exclusiveUnitRatioDistribution.sample().gt(this.trueThreshold);
	}

	public * [Symbol.iterator]() {
		while (true) yield this.sample();
	}

}