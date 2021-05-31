import * as https from 'https';

import { HttpClientError } from "../../Http/Client/Error";
import { HttpClientInterface } from "../../Http/Client/Interface";
import { HttpHeaderCollection } from '../../Http/Header/Collection';
import { HttpRequest } from "../../Http/Request/Request";
import { HttpResponse } from "../../Http/Response/Response";
import { HttpResponseStatus } from '../../Http/Response/Status';

/**
 * There's lots of room for improvement here, but it meets my needs for now
 */
export class NodeJsHttpClient implements HttpClientInterface {

	public constructor(
		private readonly nativeHttpsModule: typeof https
	) {}

	public send(request: HttpRequest): Promise<HttpResponse | HttpClientError> {

		return new Promise( resolve => {

			const headers: { [key:string]: string } = {};
			for (const entry of request.headers) {
				headers[entry.key] = entry.value;
			}
		
			const nativeRequest = 
				this.nativeHttpsModule.request(request.url, {
					method: request.method,
					headers,
				}).on('response', nativeResponse => {

					let body = ''
					nativeResponse.on('data', chunk => body += chunk );

					nativeResponse.on('end', () => {
						resolve(new HttpResponse(
							this.normalizeResponseStatus(nativeResponse.statusCode),
							body,
							this.normalizeResponseHeaders(nativeResponse.headers),
						))
					});
				});

			if (request.method !== 'GET') {
				nativeRequest.write(request.body);
			}

			nativeRequest.end();
		})
		
	}

	/**
	 * This method should probably return some kind of Result or union type, to handle failures.
	 * @param statusCode 
	 * @returns 
	 */
	private normalizeResponseStatus(statusCode: number|undefined): HttpResponseStatus {

		if (typeof statusCode !== 'number') {
			// TODO: UNHAPPY PATH
			return HttpResponseStatus.Ok; 
		}

		switch (statusCode) {
			case 200:
				return HttpResponseStatus.Ok;
			// TODO: add more
			default:
				return HttpResponseStatus.Ok;
			
		}

	}

	private normalizeResponseHeaders(nativeResponseHeaders: { [key: string]: string|string[]|undefined }): HttpHeaderCollection {

		let normalizedResponseHeaders = HttpHeaderCollection.Empty;

		for (const key in nativeResponseHeaders) {

			let value = nativeResponseHeaders[key] || '';

			if (Array.isArray(value)) {
				value = value.join(',')
			}

			normalizedResponseHeaders = normalizedResponseHeaders.set(key, value)
		}

		return normalizedResponseHeaders;
	}

}