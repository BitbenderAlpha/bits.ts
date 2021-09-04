import { NonEmptyArray } from "../../../../Array/NonEmpty";
import { Ratio } from "../../../Ratio/Ratio";
import { DefaultRandomSource } from "../../Source/Default";
import { RandomDistributionInterface } from "../Interface";
import { IntegerRangeUniformRandomDistribution } from "./IntegerRange";

export class DiscreteRandomDistribution<T> implements RandomDistributionInterface<T> {

	private readonly indexDistribution: IntegerRangeUniformRandomDistribution;

	public constructor(
		private readonly values: NonEmptyArray<T>,
		randomSource: RandomDistributionInterface<Ratio> = new DefaultRandomSource(),
	) {
		this.indexDistribution =
			new IntegerRangeUniformRandomDistribution(
				this.values.range,
				randomSource,
			);
	}

	public sample(): T {
		return this.values.get(this.indexDistribution.sample()).orDie()
	}

	public * [Symbol.iterator]() {
		while (true) yield this.sample();
	}
	
}