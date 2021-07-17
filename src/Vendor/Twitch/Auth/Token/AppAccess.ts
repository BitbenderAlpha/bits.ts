export class TwitchAppAccessAuthToken {
	public constructor(
		public readonly clientId: string,
		public readonly type: string,
		public readonly value: string,
		public readonly expirationDate: Date,
	) {}
}