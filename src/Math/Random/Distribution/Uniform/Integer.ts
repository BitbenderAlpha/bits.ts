import { NonNegativeInteger, PositiveInteger } from "../../../..";
import { Integer } from "../../../Integer/Integer";
import { DefaultRandomSource } from "../../Source/Default";
import { RandomSourceInterface } from "../../Source/Interface";
import { AbstractRandomDistribution } from "../Abstract";

export class UniformRandomIntegerDistribution<T extends Integer|PositiveInteger|NonNegativeInteger>
	extends AbstractRandomDistribution<T> {

	public constructor(
		public readonly min: T,
		public readonly max: T,
		public readonly wrap: (x: number) => T,
		private readonly source: RandomSourceInterface = new DefaultRandomSource(),
	) {
		super();
	}

	public sample() {
		return this.wrap(
			Math.floor(
				(this.max.value - this.min.value + 1)
				* this.source.sample().value
				+ this.min.value
			),
		);
	}

}