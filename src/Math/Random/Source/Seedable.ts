import { PositiveInteger, Ratio } from "../../..";
import { AbstractRandomDistribution } from "../Distribution/Abstract";
import { RandomSourceInterface } from "./Interface";

/**
 * Minimal Standard Random Number Generator
 * 
 * DO NOT USE FOR CRYPTOGRAPHIC PURPOSES
 * 
 * THIS CLASS IS STATEFUL
 */
export class SeedableRandomSource extends AbstractRandomDistribution<Ratio> implements RandomSourceInterface {

	private seed: PositiveInteger;

	// 2^31 - 1 (Mersenne Prime)
	public readonly modulus = PositiveInteger.From(2147483647).orDie(); 

	// A Recommended Prime Number
	public readonly multiplier = PositiveInteger.From(48271).orDie();

	public constructor(
		providedSeed: PositiveInteger,
	) {
		super();

		this.seed = PositiveInteger.From(providedSeed.value % this.modulus.value).orDie();
	}

	public sample() {
		const sample = new Ratio(
			this.seed,
			PositiveInteger.From(
				this.modulus.value - this.seed.value
			).orDie(),
		);

		this.seed =
			PositiveInteger.From(this.multiplier.value * this.seed.value % this.modulus.value).orDie();

		return sample;
	}
}