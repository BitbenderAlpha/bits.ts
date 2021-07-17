import { HttpHeaderCollection } from "../Header/Collection";
import { HttpResponseStatus } from "./Status";

export class HttpStructuredResponse<T> {

	public constructor(
		public readonly status: HttpResponseStatus = HttpResponseStatus.Ok,
		public readonly body: T,
		public readonly headers: HttpHeaderCollection = HttpHeaderCollection.Empty,
	) {}

	public toString() {
		return JSON.stringify(this);
	}	
}