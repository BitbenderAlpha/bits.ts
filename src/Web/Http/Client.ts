import { HttpClientInterface } from "../../Http/Client/Interface";
import { HttpHeaderCollection } from "../../Http/Header/Collection";
import { HttpRequest } from "../../Http/Request/Request";
import { HttpResponse } from "../../Http/Response/Response";
import { HttpResponseStatus } from "../../Http/Response/Status";

export class WebHttpClient implements HttpClientInterface {

	public constructor(
		private readonly dom:
			Readonly<{
				fetch: (request: Request) => Promise<Response>
			}>
	) {}

	public async send(request: HttpRequest): Promise<HttpResponse> {
		return await this.dewebifyResponse(
			await this.dom.fetch(
				this.webifyRequest(request)
			)
		);
	}

	private webifyRequest(request: HttpRequest): Request {

		const headers =  new Headers();
		for (const header of request.headers) {
			// TODO: handle bad keys
			headers.set(header.key, header.value);
		}

		const body = request.method === 'GET' ? undefined : request.body;

		return new Request(request.url, { 
			method: request.method,
			body,
			headers,
		});
	}

	private async dewebifyResponse(response: Response): Promise<HttpResponse> {

		let responseHeaders = HttpHeaderCollection.Empty;
		for (const [key, value] of response.headers.entries()) {
			responseHeaders = responseHeaders.set(key, value)
		}

		// If a bad status was returned, blame the server.
		const responseStatus =
			HttpResponseStatus.FromCodeNumber(response.status) ||
			HttpResponseStatus.InternalServerError;

		const responseBody = await response.text();

		return new HttpResponse(
			responseStatus,
			responseBody,
			responseHeaders
		);
	}

}