import { NonNegativeInteger } from "../../../..";
import { Byte } from "../../../Byte/Byte";
import { DefaultRandomSource } from "../../Source/Default";
import { RandomSourceInterface } from "../../Source/Interface";
import { AbstractRandomDistribution } from "../Abstract";
import { RandomDistributionInterface } from "../Interface";
import { UniformRandomIntegerDistribution } from "./Integer";

export class UniformRandomByteDistribution extends AbstractRandomDistribution<Byte> {

	private readonly integerValueDistribution: RandomDistributionInterface<NonNegativeInteger>;

	public constructor(
		source: RandomSourceInterface = new DefaultRandomSource(),
	) {
		super();

		this.integerValueDistribution =
			new UniformRandomIntegerDistribution(
				NonNegativeInteger.Zero,
				NonNegativeInteger.From(255).orDie(),
				(x: number) => NonNegativeInteger.From(x).orDie(),
				source,
			);
	}

	sample(): Byte {
		return Byte.From(Number(this.integerValueDistribution.sample())).orDie();
	}
	
}