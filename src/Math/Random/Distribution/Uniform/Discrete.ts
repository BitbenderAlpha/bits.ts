import { NonNegativeInteger } from "../../../..";
import { NonEmptyList } from "../../../../Collection/List/NonEmpty";
import { DefaultRandomSource } from "../../Source/Default";
import { RandomSourceInterface } from "../../Source/Interface";
import { AbstractRandomDistribution } from "../Abstract";
import { RandomDistributionInterface } from "../Interface";
import { UniformRandomIntegerDistribution } from "./Integer";

export class DiscreteRandomDistribution<T> extends AbstractRandomDistribution<T> {

	private readonly indexDistribution: RandomDistributionInterface<NonNegativeInteger>;

	public constructor(
		private readonly values: NonEmptyList<T>,
		source: RandomSourceInterface = new DefaultRandomSource(),
	) {
		super();

		this.indexDistribution =
			new UniformRandomIntegerDistribution<NonNegativeInteger>(
				NonNegativeInteger.Zero,
				NonNegativeInteger.From(values.length.value - 1).orDie(),
				(x: number) => NonNegativeInteger.From(x).orDie(),
				source,
			);
	}

	public sample(): T {
		return this.values.get(this.indexDistribution.sample()).orDie()
	}

}