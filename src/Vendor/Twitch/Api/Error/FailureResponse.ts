import { HttpResponse } from "../../../../Http/Response/Response";

export class TwitchHttpFailureResponseError {
	public constructor(
		public readonly httpResponse: HttpResponse,
	) {}
}