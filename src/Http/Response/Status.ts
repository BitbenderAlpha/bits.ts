export class HttpResponseStatus {
	private constructor(
		public readonly code: number,
		public readonly text: string,
	) {}

	public static Ok =
		new HttpResponseStatus(200, 'OK');
}