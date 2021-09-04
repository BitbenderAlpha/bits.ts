import { NonEmptyArray } from "../../../Array/NonEmpty";
import { PositiveInteger } from "../../Integer/Positive";
import { Ratio } from "../../Ratio/Ratio";
import { RandomDistributionInterface } from "../Distribution/Interface";
import { DiscreteRandomDistribution } from "../Distribution/Uniform/Discrete";
import { DefaultRandomSource } from "../Source/Default";

export class RandomCoin {
	private readonly distribution: DiscreteRandomDistribution<boolean>;

	public constructor(
		public readonly sideCount: PositiveInteger,
		randomSource: RandomDistributionInterface<Ratio> = new DefaultRandomSource(),
	) {
		this.distribution =
			new DiscreteRandomDistribution(
				NonEmptyArray.FromArray([false, true]).orDie(),
				randomSource,
			);
	}
	
	public flipBoolean(): boolean {
		return this.distribution.sample();
	}

	public flip(): 'heads' | 'tails' {
		return this.flipBoolean() ? 'heads' : 'tails';
	}
}