import { Byte } from "../../../Byte/Byte";
import { Integer } from "../../../Integer/Integer";
import { IntegerRange } from "../../../Range/Integer";
import { DefaultRandomSource } from "../../Source/Default";
import { RandomSourceInterface } from "../../Source/Interface";
import { AbstractRandomDistribution } from "../Abstract";
import { RandomDistributionInterface } from "../Interface";
import { IntegerRangeUniformRandomDistribution } from "./IntegerRange";

export class UniformRandomByteDistribution extends AbstractRandomDistribution<Byte> {

	private readonly integerRangeDistribution: RandomDistributionInterface<Integer>

	public constructor(
		source: RandomSourceInterface = new DefaultRandomSource(),
	) {
		super();

		this.integerRangeDistribution =
			new IntegerRangeUniformRandomDistribution(
				new IntegerRange(
					Integer.From(0).orDie(),
					Integer.From(255).orDie(),
				),
				source,
			);

	}

	sample(): Byte {
		return Byte.From(Number(this.integerRangeDistribution.sample())).orDie();
	}
	
}