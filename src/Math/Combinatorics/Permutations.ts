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
	
	/**
	 * Gotta go fast
	 */
	public static * permuteInPlace<T>(a: T[]) {
		const n = a.length;
		const c = new Array(n).fill(0);
		yield a;
		let i = 0;
		while (i < n) {
			if (c[i] < i) {
				const j = (i % 2) ? c[i] : 0;
				
				//swap a[i] with a[j]
				const tmp = a[j];
				a[j] = a[i] as T;
				a[i] = tmp as T;

				// output
				yield a;

				// update
				c[i]++;
				i = 0;
			} else {
				c[i] = 0;
				i++;
			}
		}	
	}

}
