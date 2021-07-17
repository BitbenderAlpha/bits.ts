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
	
}