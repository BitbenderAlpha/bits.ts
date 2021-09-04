export class Fault {

	private constructor(
		public readonly message: string,
		public readonly context: Record<string,string> = {},
		public readonly cause: Fault | null = null,
	) {}

	public static Root(message: string, context: Record<string, string> = {}) {
		return new Fault(message, context);
	}

	public wrap(message: string, context: Record<string,string> = {}): Fault {
		return new Fault(message, context, this);
	}

	public toString(): string {
		let s = '';

		s += `${this.message}\n`;

		for (const [key, value] of Object.entries(this.context)) {
			s += `    ${key} = ${value}\n`
		}

		if (this.cause) {
			s += `Because ${this.cause}`;
		} else {
			s += '\n';
		}
	
		return s;
	} 
	
}