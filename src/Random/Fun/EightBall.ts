import { NonEmptyArray } from "../../Array/NonEmpty";
import { ExclusiveUnitRatio } from "../../Ratio/Unit/Exclusive";
import { RandomDistributionInterface } from "../Distribution/Interface";
import { DiscreteRandomDistribution } from "../Distribution/Uniform/Discrete";
import { NativeExlusiveUnitRatioUniformRandomDistribution } from "../Distribution/Uniform/NativeExclusiveUnitRatio";

export class RandomEightBall {

	public readonly responses =
		NonEmptyArray.FromArray([
			'It is Certain.',
			'It is decidedly so.',
			'Without a doubt.',
			'Yes definitely.',
			'You may rely on it.',
			'As I see it, yes.',
			'Most likely.',
			'Outlook good.',
			'Yes.',
			'Signs point to yes.',
			'Reply hazy, try again.',
			'Ask again later.',
			'Better not tell you now.',
			'Cannot predict now.',
			'Concentrate and ask again.',
			'Don\'t count on it.',
			'My reply is no.',
			'My sources say no.',
			'Outlook not so good.',
			'Very doubtful.',
		]).trustMe()

	private readonly distribution: DiscreteRandomDistribution<string>;

	public constructor(
		exclusiveUnitRatioDistribution:
			RandomDistributionInterface<ExclusiveUnitRatio>
				= new NativeExlusiveUnitRatioUniformRandomDistribution()
	) {
		this.distribution =
			new DiscreteRandomDistribution(this.responses, exclusiveUnitRatioDistribution);
	}

	public shake(): string {
		return this.distribution.sample();
	}
}