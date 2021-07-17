import { ExclusiveUnitRatio } from "../../../Ratio/Unit/Exclusive";
import { RandomDistributionInterface } from "../Interface";
import { NativeExlusiveUnitRatioUniformRandomDistribution } from "./NativeExclusiveUnitRatio";

export class UniformBooleanRandomDistribution implements RandomDistributionInterface<boolean> {
	public constructor(
		private readonly exclusiveUnitRatioDistribution:
			RandomDistributionInterface<ExclusiveUnitRatio>
				= new NativeExlusiveUnitRatioUniformRandomDistribution()
	) {}
	
	public sample(): boolean {
		return Number(this.exclusiveUnitRatioDistribution.sample()) > 0.5;
	}

	public * [Symbol.iterator]() {
		while (true) yield this.sample();
	}

}