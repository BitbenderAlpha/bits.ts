import { Result } from "../../Result/Result";
import { HttpRequest } from "../Request/Request";
import { HttpResponse } from "../Response/Response";
import { HttpClientError } from "./Error";

export interface HttpClientInterface {
	send(request: HttpRequest): Promise<Result<HttpResponse, HttpClientError>>
}