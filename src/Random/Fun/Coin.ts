import { NonEmptyArray } from "../../Array/NonEmpty";
import { PositiveInteger } from "../../Integer/Positive";
import { ExclusiveUnitRatio } from "../../Ratio/Unit/Exclusive";
import { RandomDistributionInterface } from "../Distribution/Interface";
import { DiscreteRandomDistribution } from "../Distribution/Uniform/Discrete";
import { NativeExlusiveUnitRatioUniformRandomDistribution } from "../Distribution/Uniform/NativeExclusiveUnitRatio";

export class RandomCoin {
	private readonly distribution: DiscreteRandomDistribution<boolean>;

	public constructor(
		public readonly sideCount: PositiveInteger,
		exclusiveUnitRatioDistribution:
			RandomDistributionInterface<ExclusiveUnitRatio>
				= new NativeExlusiveUnitRatioUniformRandomDistribution()
	) {
		this.distribution =
			new DiscreteRandomDistribution(
				NonEmptyArray.FromArray([false, true]).trustMe(),
				exclusiveUnitRatioDistribution,
			);
	}
	
	public flipBoolean(): boolean {
		return this.distribution.sample();
	}

	public flip(): 'heads' | 'tails' {
		return this.flipBoolean() ? 'heads' : 'tails';
	}
}