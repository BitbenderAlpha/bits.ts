import { HttpHeaderCollection } from "../Header/Collection";

export class HttpRequest {
	public constructor(
		public readonly method: 'GET' | 'POST', // todo: more
		public readonly url: string, // todo: more
		public readonly headers: HttpHeaderCollection = HttpHeaderCollection.Empty,
		public readonly body: string = '', 
	) {}
}