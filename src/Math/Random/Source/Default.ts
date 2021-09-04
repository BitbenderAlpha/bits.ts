import { Ratio } from "../../Ratio/Ratio";
import { RandomDistributionInterface } from "../Distribution/Interface";

export class DefaultRandomSource implements RandomDistributionInterface<Ratio> {

	public sample(): Ratio {
		return Ratio.From(Math.random() || Number.EPSILON).orDie();
	}

	public * [Symbol.iterator]() {
		while (true) yield this.sample();
	}
	
}