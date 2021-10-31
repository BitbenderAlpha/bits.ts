import { NonEmptyList } from "../../../Collection/List/NonEmpty";
import { Ratio } from "../../Ratio/Ratio";
import { RandomDistributionInterface } from "../Distribution/Interface";
import { DiscreteRandomDistribution } from "../Distribution/Uniform/Discrete";
import { DefaultRandomSource } from "../Source/Default";

export class RandomEightBall {

	public readonly responses =
		NonEmptyList.From([
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
		])
		.orDie()

	private readonly distribution: DiscreteRandomDistribution<string>;

	public constructor(
		randomSoure: RandomDistributionInterface<Ratio> = new DefaultRandomSource(),
	) {
		this.distribution =
			new DiscreteRandomDistribution(this.responses, randomSoure);
	}

	public shake(): string {
		return this.distribution.sample();
	}
}