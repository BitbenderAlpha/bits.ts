import { Ratio } from "../../../Ratio/Ratio";
import { RandomDistributionInterface } from "../Interface";
import { DefaultRandomSource } from "../../Source/Default";

export class UniformBooleanRandomDistribution implements RandomDistributionInterface<boolean> {
	public constructor(
		private readonly randomSource: RandomDistributionInterface<Ratio> = new DefaultRandomSource(),
	) {}
	
	public sample(): boolean {
		return Number(this.randomSource.sample()) > 0.5;
	}

	public * [Symbol.iterator]() {
		while (true) yield this.sample();
	}

}