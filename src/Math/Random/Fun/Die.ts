import { UniformRandomIntegerDistribution } from "../../..";
import { PositiveInteger } from "../../Integer/Positive";
import { RandomDistributionInterface } from "../Distribution/Interface";
import { DefaultRandomSource } from "../Source/Default";
import { RandomSourceInterface } from "../Source/Interface";

export class RandomDie {
	private readonly distribution: RandomDistributionInterface<PositiveInteger>;

	public constructor(
		public readonly sideCount: PositiveInteger,
		source: RandomSourceInterface = new DefaultRandomSource()
	) {
		this.distribution =
			new UniformRandomIntegerDistribution(
				PositiveInteger.One,
				sideCount,
				(x: number) => PositiveInteger.From(x).orDie(),
				source,
			);
	}

	public static readonly D4 = new RandomDie(PositiveInteger.From(4).orDie());
	public static readonly D6 = new RandomDie(PositiveInteger.From(6).orDie());
	public static readonly D8 = new RandomDie(PositiveInteger.From(8).orDie());
	public static readonly D10 = new RandomDie(PositiveInteger.From(10).orDie());
	public static readonly D12 = new RandomDie(PositiveInteger.From(12).orDie());
	public static readonly D20 = new RandomDie(PositiveInteger.From(20).orDie());

	public roll() {
		return this.distribution.sample();
	}
}