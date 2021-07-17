export class CliCommand {
	public constructor(
		public commandName: string,
		public keyedParameters: Record<string, undefined|string|true>,
		public orderedParameters: string[],
	) {}
}