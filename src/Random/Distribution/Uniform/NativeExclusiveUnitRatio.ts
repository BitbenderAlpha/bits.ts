import { ExclusiveUnitRatio } from "../../../Ratio/Unit/Exclusive";
import { RandomDistributionInterface } from "../Interface";

export class NativeExlusiveUnitRatioUniformRandomDistribution implements RandomDistributionInterface<ExclusiveUnitRatio> {

	public sample(): ExclusiveUnitRatio {
		return ExclusiveUnitRatio.From(Math.random() || Number.EPSILON).trustMe()
	}

	public * [Symbol.iterator]() {
		while (true) yield this.sample();
	}
	
}