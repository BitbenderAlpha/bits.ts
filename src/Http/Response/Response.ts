import { HttpHeaderCollection } from "../Header/Collection";
import { HttpResponseStatus } from "./Status";

export class HttpResponse {
	public constructor(
		public readonly status: HttpResponseStatus = HttpResponseStatus.Ok,
		public readonly body: string = '',
		public readonly headers: HttpHeaderCollection = HttpHeaderCollection.Empty,
	) {}
}