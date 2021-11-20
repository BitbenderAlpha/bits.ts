import { Ratio } from "../../Ratio/Ratio";
import { AbstractRandomDistribution } from "../Distribution/Abstract";
import { RandomSourceInterface } from "./Interface";

export class DefaultRandomSource extends AbstractRandomDistribution<Ratio> implements RandomSourceInterface {

	public sample(): Ratio {
		return Ratio.From(Math.random() || Number.EPSILON).orDie();
	}
	
}