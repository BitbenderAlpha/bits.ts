import { List } from "../..";

export class Permutations<T> implements Iterable<List<T>> {

	public constructor(
		private readonly elements: List<T>,
	) {}

	public * [Symbol.iterator]() {
		yield * Permutations.permute(this.elements);
	}

	public static * permute<T>(elements: List<T>): Iterable<List<T>> {
		if (elements.length < 2) {
			yield elements;
			return;
		} 

		for (const [i, ei] of elements.entries) {
			let subList = List.Empty<T>();
			for (const [j, ej] of elements.entries) {
				if (i.neq(j)) {
					subList = subList.appendElement(ej);
				}
			}
			for (const permutedSublist of Permutations.permute<T>(subList)) {
				yield List.Empty<T>().appendElement(ei).appendList(permutedSublist);
			}
		}
	}

}
