import { Ratio } from "../../../Ratio/Ratio";
import { DefaultRandomSource } from "../../Source/Default";
import { RandomSourceInterface } from "../../Source/Interface";
import { AbstractRandomDistribution } from "../Abstract";

export class WeightedBooleanRandomDistribution extends AbstractRandomDistribution<boolean> {

	public constructor(
		private readonly trueThreshold: Ratio,
		private readonly source: RandomSourceInterface = new DefaultRandomSource()
	) {
		super();
	}
	
	public sample(): boolean {
		return this.source.sample().gt(this.trueThreshold);
	}

}