export class TwitchUser {
	public constructor(
		public readonly id: string,
		public readonly loginName: string,
		public readonly displayName: string,
		public readonly description: string,
	) {}
}