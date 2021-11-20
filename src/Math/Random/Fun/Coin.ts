import { UniformBooleanRandomDistribution } from "../../..";
import { PositiveInteger } from "../../Integer/Positive";
import { DefaultRandomSource } from "../Source/Default";
import { RandomSourceInterface } from "../Source/Interface";

export class RandomCoin {
	private readonly booleanDistribution: UniformBooleanRandomDistribution;

	public constructor(
		public readonly sideCount: PositiveInteger,
		source: RandomSourceInterface = new DefaultRandomSource(),
	) {
		this.booleanDistribution = new UniformBooleanRandomDistribution(source);
	}
	
	public flipBoolean(): boolean {
		return this.booleanDistribution.sample();
	}

	public flip(): 'heads' | 'tails' {
		return this.flipBoolean() ? 'heads' : 'tails';
	}
}