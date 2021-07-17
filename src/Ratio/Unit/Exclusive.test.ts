import { ExclusiveUnitRatio } from "./Exclusive";

/**
 * This is here to find repeating digit sequences, such as 1/3 = 0x0.010101010101010101...
 */
test('ExclusiveUnitRatio.From(1/n), n > 1', () => {
	for (let n = 2; n < 100000; n++) {
		const x = 1 / n;
		expect(Number(ExclusiveUnitRatio.From(x).value)).toBe(x);
	}
});

/**
 * I'm fully-aware that the jest docs explicitly say to not use floats
 * with .toBe(), but I probably know what I'm doing.
 */
test('ExclusiveUnitRatio.From(Math.random()||Number.EPSILON)', () => {
	let iterations = 100000;
	while (iterations--) {
		// Math.random() returns [0, 1), so we replace 0 with epsilon
		const x = Math.random() || Number.EPSILON;
		expect(Number(ExclusiveUnitRatio.From(x).value)).toBe(x);
	}
});

test('ExclusiveUnitRatio.From(a/2^k), k < 17, a < 2^k', () => {
	for (let k = 1; k < 17; k++) {
		const c = Math.pow(2,k);
		for (let a = 1; a < c; a++) {
			// Skip multiples of 2
			if (a % 2 === 0) continue;
			const r = ExclusiveUnitRatio.From(a / c).trustMe();
			expect(Number(r.a)).toBe(a);
			expect(Number(r.b)).toBe(c-a);
		}
	}
});
