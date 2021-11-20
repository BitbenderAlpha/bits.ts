import { DefaultRandomSource } from "../../Source/Default";
import { RandomSourceInterface } from "../../Source/Interface";
import { AbstractRandomDistribution } from "../Abstract";

export class UniformBooleanRandomDistribution extends AbstractRandomDistribution<boolean> {
	public constructor(
		private readonly source: RandomSourceInterface = new DefaultRandomSource(),
	) {
		super();
	}
	
	public sample(): boolean {
		return Number(this.source.sample()) > 0.5;
	}
}