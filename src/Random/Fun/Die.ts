import { Integer } from "../../Integer/Integer";
import { PositiveInteger } from "../../Integer/Positive";
import { IntegerRange } from "../../Range/Integer";
import { ExclusiveUnitRatio } from "../../Ratio/Unit/Exclusive";
import { RandomDistributionInterface } from "../Distribution/Interface";
import { IntegerRangeUniformRandomDistribution } from "../Distribution/Uniform/IntegerRange";
import { NativeExlusiveUnitRatioUniformRandomDistribution } from "../Distribution/Uniform/NativeExclusiveUnitRatio";

export class RandomDie {
	private readonly distribution: IntegerRangeUniformRandomDistribution;

	public constructor(
		public readonly sideCount: PositiveInteger,
		exclusiveUnitRatioDistribution:
			RandomDistributionInterface<ExclusiveUnitRatio>
				= new NativeExlusiveUnitRatioUniformRandomDistribution()
	) {
		this.distribution =
			new IntegerRangeUniformRandomDistribution(
				new IntegerRange(Integer.From(1).trustMe(), sideCount),
				exclusiveUnitRatioDistribution,
			)
	}

	public static readonly D4 = new RandomDie(Integer.From(4).trustMe());
	public static readonly D6 = new RandomDie(Integer.From(6).trustMe());
	public static readonly D8 = new RandomDie(Integer.From(8).trustMe());
	public static readonly D10 = new RandomDie(Integer.From(10).trustMe());
	public static readonly D12 = new RandomDie(Integer.From(12).trustMe());
	public static readonly D20 = new RandomDie(Integer.From(20).trustMe());

	public roll(): Integer {
		return this.distribution.sample();
	}
}