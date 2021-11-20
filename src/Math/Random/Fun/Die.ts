import { Integer } from "../../Integer/Integer";
import { PositiveInteger } from "../../Integer/Positive";
import { IntegerRange } from "../../Range/Integer";
import { IntegerRangeUniformRandomDistribution } from "../Distribution/Uniform/IntegerRange";
import { DefaultRandomSource } from "../Source/Default";
import { RandomSourceInterface } from "../Source/Interface";

export class RandomDie {
	private readonly distribution: IntegerRangeUniformRandomDistribution;

	public constructor(
		public readonly sideCount: PositiveInteger,
		source: RandomSourceInterface = new DefaultRandomSource()
	) {
		this.distribution =
			new IntegerRangeUniformRandomDistribution(
				new IntegerRange(Integer.From(1).orDie(), sideCount),
				source,
			);
	}

	public static readonly D4 = new RandomDie(Integer.From(4).orDie());
	public static readonly D6 = new RandomDie(Integer.From(6).orDie());
	public static readonly D8 = new RandomDie(Integer.From(8).orDie());
	public static readonly D10 = new RandomDie(Integer.From(10).orDie());
	public static readonly D12 = new RandomDie(Integer.From(12).orDie());
	public static readonly D20 = new RandomDie(Integer.From(20).orDie());

	public roll(): Integer {
		return this.distribution.sample();
	}
}