export class TwitchHttpMalformedResponseBodyError {
	public constructor(
		public readonly validationErrorMessage: string,
		public readonly body: string,
	) {}
}