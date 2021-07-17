export class TwitchChatMessage {
	public constructor(
		public readonly senderDisplayName: string,
		public readonly text: string,
	) {}

	public get words(): string[] {
		return this.text.trim().replace(/\s+/g,' ').split(' ');
	}
}