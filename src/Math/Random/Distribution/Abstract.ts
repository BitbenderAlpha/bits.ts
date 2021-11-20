import { RandomDistributionInterface } from "./Interface";

export abstract class AbstractRandomDistribution<T> implements RandomDistributionInterface<T> {
	public abstract sample(): T;
	public * [Symbol.iterator]() {
		while (true) yield this.sample();
	}
}