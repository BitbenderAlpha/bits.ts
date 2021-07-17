import { HttpHeaderCollection } from "../Header/Collection";
import { HttpResponseStatus } from "./Status";
import { HttpStructuredResponse } from "./Structured";

export class HttpResponse {
	public constructor(
		public readonly status: HttpResponseStatus = HttpResponseStatus.Ok,
		public readonly body: string = '',
		public readonly headers: HttpHeaderCollection = HttpHeaderCollection.Empty,
	) {}

	public toString() {
		return JSON.stringify(this);
	}

	public get ok() {
		return this.status.isSuccess;
	}

	public structure<T>(body: T): HttpStructuredResponse<T> {
		return new HttpStructuredResponse(
			this.status,
			body,
			this.headers
		)
	}
}