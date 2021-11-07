import { List } from "../..";
import { Permutations } from "./Permutations";

describe('Permutations', () => {
	test('basic usage -- static method', () => {
		const input = new List<number>([4,5,6]);
		const permutations: any[][] = []
		for (const permutation of Permutations.permute(input)) {
			permutations.push(Array.from(permutation));
		}
		expect(permutations).toEqual([
			[4,5,6],
			[4,6,5],
			[5,4,6],
			[5,6,4],
			[6,4,5],
			[6,5,4],
		]);
	});

	test('basic usage -- fast static method', () => {
		const permutations: any[][] = []
		for (const permutation of Permutations.permuteInPlace([4,5,6])) {
			permutations.push(Array.from(permutation));
		}
		expect(permutations).toEqual([
			[4,5,6],
			[5,4,6],
			[6,4,5],
			[4,6,5],
			[5,6,4],
			[6,5,4]
		]);
	});
	test('basic usage -- class', () => {
		const input = new List<number>([4,5,6]);
		const permutations: any[][] = []
		for (const permutation of new Permutations(input)) {
			permutations.push(Array.from(permutation));
		}
		expect(permutations).toEqual([
			[4,5,6],
			[4,6,5],
			[5,4,6],
			[5,6,4],
			[6,4,5],
			[6,5,4],
		]);
	});

	test('degenerate cases', () => {
		expect(Array.from(Permutations.permute(new List([]))).map(x=>Array.from(x))).toEqual([[]]);
		expect(Array.from(Permutations.permute(new List(['foo']))).map(x=>Array.from(x))).toEqual([['foo']]);
	});
});