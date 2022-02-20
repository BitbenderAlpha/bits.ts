import { Ratio } from "./Ratio";

/**
 * This is here to find repeating digit sequences, such as 1/3 = 0x0.010101010101010101...
 */
test('Ratio.From(1/n), n > 1', () => {
	for (let n = 2; n < 10000; n++) {
		const x = 1 / n;
		expect(Number(Ratio.From(x).value)).toBe(x);
	}
});

/**
 * I'm fully-aware that the jest docs explicitly say to not use floats
 * with .toBe(), but I probably know what I'm doing.
 */
test('Ratio.From(Math.random()||Number.EPSILON)', () => {
	let iterations = 10000;
	while (iterations--) {
		// Math.random() returns [0, 1), so we replace 0 with epsilon
		const x = Math.random() || Number.EPSILON;
		expect(Number(Ratio.From(x).value)).toBe(x);
	}
});

test('Ratio.From(a/2^k), k < 15, a < 2^k', () => {
	for (let k = 1; k < 15; k++) {
		const c = Math.pow(2,k);
		for (let a = 1; a < c; a++) {
			// Skip multiples of 2
			if (a % 2 === 0) continue;
			const r = Ratio.From(a / c).orDie();
			expect(Number(r.a)).toBe(a);
			expect(Number(r.b)).toBe(c-a);
		}
	}
});

test('Ratio limits', () => {
	expect(Ratio.Min.value).toBe(Number.EPSILON);
	expect(Ratio.Max.value).toBe(1-Number.EPSILON);
});

test('Ratio.Clamp(number)', () => {
	// Clamp to Min
	expect(Ratio.Clamp(-Infinity).value).toBe(Ratio.Min.value);
	expect(Ratio.Clamp(-2).value).toBe(Ratio.Min.value);
	expect(Ratio.Clamp(-1).value).toBe(Ratio.Min.value);
	expect(Ratio.Clamp(0).value).toBe(Ratio.Min.value);

	// Clamp to Half
	expect(Ratio.Clamp(Number.NaN).value).toBe(Ratio.Half.value);

	// Clamp to Max
	expect(Ratio.Clamp(+1).value).toBe(Ratio.Max.value);
	expect(Ratio.Clamp(+2).value).toBe(Ratio.Max.value);
	expect(Ratio.Clamp(+Infinity).value).toBe(Ratio.Max.value);
});
