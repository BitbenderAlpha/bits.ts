import { NonEmptyList } from "../../../../Collection/List/NonEmpty";
import { DefaultRandomSource } from "../../Source/Default";
import { RandomSourceInterface } from "../../Source/Interface";
import { AbstractRandomDistribution } from "../Abstract";
import { IntegerRangeUniformRandomDistribution } from "./IntegerRange";

export class DiscreteRandomDistribution<T> extends AbstractRandomDistribution<T> {

	private readonly indexDistribution: IntegerRangeUniformRandomDistribution;

	public constructor(
		private readonly values: NonEmptyList<T>,
		source: RandomSourceInterface = new DefaultRandomSource(),
	) {
		super();

		this.indexDistribution =
			new IntegerRangeUniformRandomDistribution(
				this.values.indexRange,
				source,
			);
	}

	public sample(): T {
		return this.values.get(this.indexDistribution.sample()).orDie()
	}

}