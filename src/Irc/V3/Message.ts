export class IrcV3Message {
	public constructor(
		public readonly tags: Record<string, string>,
		public readonly prefix: string,
		public readonly command: string,
		public readonly parameters: string[]
	) {}
}
