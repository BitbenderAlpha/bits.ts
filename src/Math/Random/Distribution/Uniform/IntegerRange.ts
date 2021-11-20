import { Integer } from "../../../Integer/Integer";
import { IntegerRange } from "../../../Range/Integer";
import { DefaultRandomSource } from "../../Source/Default";
import { RandomSourceInterface } from "../../Source/Interface";
import { AbstractRandomDistribution } from "../Abstract";

export class IntegerRangeUniformRandomDistribution extends AbstractRandomDistribution<Integer> {

	public constructor(
		public readonly range: IntegerRange,
		private readonly source: RandomSourceInterface = new DefaultRandomSource(),
	) {
		super();
	}

	public sample() {
		const min = this.range.min.value;
		const max = this.range.max.value;
		const x = Number(this.source.sample());
		return Integer.From(Math.floor((max - min + 1) * x) + min).orDie();
	}

}