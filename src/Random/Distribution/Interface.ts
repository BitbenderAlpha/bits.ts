export interface RandomDistributionInterface<T> extends Iterable<T> {
	sample(): T
}