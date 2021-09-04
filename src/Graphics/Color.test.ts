import { UniformRandomByteDistribution } from "../Math/Random/Distribution/Uniform/Byte";
import { Color } from "./Color";

describe('Color', () => {

	for (let r = 0; r < 16; r++) {
		const R = r.toString(16);
		for (let g = 0; g < 16; g++) {
			const G = g.toString(16);
			for (let b = 0; b < 16; b++) {
				const B = b.toString(16);
				const shortColorHex = R+G+B;
				const longColorHex = R+R+G+G+B+B;
				test(`Color.FromString("${shortColorHex}").toString() === ${longColorHex}`, () => {
					expect(String(Color.FromString(shortColorHex).orDie())).toBe(longColorHex);
				});
				test(`Color.FromString("#${shortColorHex}").toString() === ${longColorHex}`, () => {
					expect(String(Color.FromString('#'+shortColorHex).orDie())).toBe(longColorHex);
				});
			}
		}	
	}

	const randomBytes = new UniformRandomByteDistribution();
	let tests = 10000;

	while (tests--) {
		const RR = randomBytes.sample().toHexString();
		const GG = randomBytes.sample().toHexString();
		const BB = randomBytes.sample().toHexString();
		const colorHex = RR+GG+BB;
		test(`Color.FromString("${colorHex}").toString() === ${colorHex}`, () => {
			expect(String(Color.FromString(colorHex).orDie())).toBe(colorHex);
		});
		test(`Color.FromString("#${colorHex}").toString() === ${colorHex}`, () => {
			expect(String(Color.FromString('#'+colorHex).orDie())).toBe(colorHex);
		});
	}
	
});