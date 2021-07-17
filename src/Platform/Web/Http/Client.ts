import { HttpClientError } from "../../../Http/Client/Error";
import { HttpClientInterface } from "../../../Http/Client/Interface";
import { HttpHeaderCollection } from "../../../Http/Header/Collection";
import { HttpRequest } from "../../../Http/Request/Request";
import { HttpResponse } from "../../../Http/Response/Response";
import { HttpResponseStatus } from "../../../Http/Response/Status";
import { Result } from "../../../Result/Result";

export class WebHttpClient implements HttpClientInterface {

	public constructor(
		private readonly webGlobal = window
	) {}

	public async send(request: HttpRequest) {
		try {
			return Result.Success(
				await this.dewebifyResponse(
					await this.webGlobal.fetch(
						this.webifyRequest(request)
					)
				)
			);
		} catch {
			return Result.Failure(
				new HttpClientError(),
			);
		}
		
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
		response.headers.forEach( (value, key) => {
			responseHeaders = responseHeaders.set(key, value)
		});
		
		// If a bad status was returned, blame the server.
		const responseStatus =
			HttpResponseStatus
				.FromCodeNumber(response.status)
				.replaceFailureWith(HttpResponseStatus.InternalServerError)
				.value;

		const responseBody = await response.text();

		return new HttpResponse(
			responseStatus,
			responseBody,
			responseHeaders
		);
	}

}