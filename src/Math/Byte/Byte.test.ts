import { Byte } from "./Byte"

describe('Byte', () => {

	for (let k = 0; k < 256; k++) {
		test(`Byte.From(${k}) === ${k}`, () => {
			expect(Number(Byte.From(k).orDie())).toBe(k);
		});
	}

	for (let k = 0; k < 256; k++) {
		test(`Byte.From("${k}") === ${k}`, () => {
			expect(Number(Byte.From(String(k)).orDie())).toBe(k);
		});
	}

	for (let k = 0; k < 256; k++) {
		const hexString = k.toString(16).padStart(2,'0');
		test(`Byte.FromHexString("${hexString}") === ${k}`, () => {
			expect(Number(Byte.FromHexString(hexString).orDie())).toBe(k);
		});
	}

});