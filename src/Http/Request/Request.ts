import { HttpHeaderCollection } from "../Header/Collection";
import { HttpRequestMethod } from "./Method";

export class HttpRequest {
	public constructor(
		public readonly method: HttpRequestMethod,
		public readonly url: string, // todo: more
		public readonly headers: HttpHeaderCollection = HttpHeaderCollection.Empty,
		public readonly body: string = '', 
	) {}
}