import { Ratio } from "../../../Ratio/Ratio";
import { DefaultRandomSource } from "../../Source/Default";
import { RandomDistributionInterface } from "../Interface";

export class WeightedBooleanRandomDistribution implements RandomDistributionInterface<boolean> {

	public constructor(
		private readonly trueThreshold: Ratio,
		private readonly randomSource: RandomDistributionInterface<Ratio> = new DefaultRandomSource()
	) {}
	
	public sample(): boolean {
		return this.randomSource.sample().gt(this.trueThreshold);
	}

	public * [Symbol.iterator]() {
		while (true) yield this.sample();
	}

}