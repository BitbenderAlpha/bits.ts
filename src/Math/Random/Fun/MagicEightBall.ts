import { NonEmptyList } from "../../../Collection/List/NonEmpty";
import { DiscreteRandomDistribution } from "../Distribution/Uniform/Discrete";
import { DefaultRandomSource } from "../Source/Default";
import { RandomSourceInterface } from "../Source/Interface";

export class MagicEightBall {

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
		source: RandomSourceInterface = new DefaultRandomSource(),
	) {
		this.distribution = new DiscreteRandomDistribution(this.responses, source);
	}

	public shake(): string {
		return this.distribution.sample();
	}
}