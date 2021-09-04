import { Byte } from "../../../Byte/Byte";
import { Integer } from "../../../Integer/Integer";
import { IntegerRange } from "../../../Range/Integer";
import { Ratio } from "../../../Ratio/Ratio";
import { DefaultRandomSource } from "../../Source/Default";
import { RandomDistributionInterface } from "../Interface";
import { IntegerRangeUniformRandomDistribution } from "./IntegerRange";

export class UniformRandomByteDistribution implements RandomDistributionInterface<Byte> {

	private readonly integerRangeDistribution: RandomDistributionInterface<Integer>

	public constructor(
		randomSource: RandomDistributionInterface<Ratio> = new DefaultRandomSource(),
	) {
		this.integerRangeDistribution =
			new IntegerRangeUniformRandomDistribution(
				new IntegerRange(
					Integer.From(0).orDie(),
					Integer.From(255).orDie(),
				),
				randomSource,
			);

	}

	sample(): Byte {
		return Byte.From(Number(this.integerRangeDistribution.sample())).orDie();
	}

	public * [Symbol.iterator]() {
		while (true) yield this.sample();
	}
	
}