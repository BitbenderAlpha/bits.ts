export class TwitchAuthAppAccessToken {
	public constructor(
		public readonly type: string,
		public readonly value: string,
		public readonly expirationDate: Date,
	) {}
}