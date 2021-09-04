import { Fault } from "../Fault/Fault";
import { Byte } from "../Math/Byte/Byte";
import { Result } from "../Result/Result";

export class Color {
	public constructor(
		public readonly redByte: Byte,
		public readonly greenByte: Byte,
		public readonly blueByte: Byte, 
	) {}

	public static readonly Black = Color.FromString('#000').orDie();
	public static readonly Red = Color.FromString('#f00').orDie();
	public static readonly Green = Color.FromString('#0f0').orDie();
	public static readonly Blue = Color.FromString('#00f').orDie();
	public static readonly White = Color.FromString('#fff').orDie();

	public toString() {
		return (
			Number(this.redByte).toString(16).padStart(2,'0') +
			Number(this.greenByte).toString(16).padStart(2,'0') +
			Number(this.blueByte).toString(16).padStart(2,'0')
		);
	}

	public static FromString(s: string, name: string = 'Color.FromString input value'): Result<Color, Fault> {
		// normalize
		if (s.charAt(0) === '#') s = s.slice(1);
		s = s.toLowerCase();

		// Validate
		return (
			Result.FromBoolean(/^[0-9a-f]{3,6}$/.test(s))
				.replaceFailureWith(Fault.Root(`${name} was not formatted correctly`))
				.map( () => {
					// characters per byte (1 or 2)
					const cpb = s.length / 3;

					let R = s.slice(0, cpb);
					let G = s.slice(cpb, 2 * cpb);
					let B = s.slice(2 * cpb);

					const r = parseInt(R.padEnd(2,R), 16);
					const g = parseInt(G.padEnd(2,G), 16);
					const b = parseInt(B.padEnd(2,B), 16);

					return new Color(
						Byte.From(r, `${name} red byte`).orDie(),
						Byte.From(g, `${name} green byte`).orDie(),
						Byte.From(b, `${name} blue byte`).orDie(),
					);
				})
		);
	}
}