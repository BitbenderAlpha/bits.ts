import { Fault } from "../../Fault/Fault";
import { Result } from "../../Result/Result";

export class HttpResponseStatus {

	private constructor(
		public readonly code: number,
		public readonly text: string,
	) {}

	public static Continue = new HttpResponseStatus(100, 'Continue');
	public static SwitchingProtocol = new HttpResponseStatus(101, 'Switching Protocol');
	public static Processing = new HttpResponseStatus(102, 'Processing');
	public static EarlyHints  = new HttpResponseStatus(103, 'Early Hints');
	public static Ok = new HttpResponseStatus(200, 'OK');
	public static Created = new HttpResponseStatus(201, 'Created');
	public static Accepted  = new HttpResponseStatus(202, 'Accepted');
	public static NonAuthoritativeInformation = new HttpResponseStatus(203, 'Non-Authoritative Information');
	public static NoContent  = new HttpResponseStatus(204, 'No Content');
	public static ResetContent = new HttpResponseStatus(205, 'Reset Content');
	public static PartialContent = new HttpResponseStatus(206, 'Partial Content');
	public static MultiStatus = new HttpResponseStatus(207, 'Multi-Status');
	public static AlreadyReported = new HttpResponseStatus(208, 'Already Reported');
	public static ImUsed = new HttpResponseStatus(226, 'IM Used');
	public static MultipleChoice = new HttpResponseStatus(300, 'Multiple Choice');
	public static MovedPermanently = new HttpResponseStatus(301, 'Moved Permanently');
	public static Found = new HttpResponseStatus(302, 'Found');
	public static SeeOther = new HttpResponseStatus(303, 'See Other');
	public static NotModified = new HttpResponseStatus(304, 'Not Modifed');
	// NOTE -- 305 and 306 exist, but are deprecated
	public static TemporaryRedirect = new HttpResponseStatus(307, 'Temporary Redirect');
	public static PermanentRedirect = new HttpResponseStatus(308, 'Permanent Redirect');
	public static BadRequest = new HttpResponseStatus(400, 'Bad Request');
	public static Unauthorized  = new HttpResponseStatus(401, 'Unauthorized');
	public static PaymentRequired = new HttpResponseStatus(402, 'Payment Required');
	public static Forbidden = new HttpResponseStatus(403, 'Forbidden');
	public static NotFound = new HttpResponseStatus(404, 'Not Found');
	public static MethodNotAllowed = new HttpResponseStatus(405, 'Method Not Allowed');
	public static NotAcceptable = new HttpResponseStatus(406, 'Not Acceptable');
	public static ProxyAuthenticationRequired = new HttpResponseStatus(407, 'Proxy Authentication Required');
	public static RequestTimeout = new HttpResponseStatus(408, 'Request Timeout');
	public static Conflict = new HttpResponseStatus(409, 'Conflict');
	public static Gone = new HttpResponseStatus(410, 'Gone');
	public static LengthRequired = new HttpResponseStatus(411, 'Length Required');
	public static PreconditionFailed = new HttpResponseStatus(412, 'Precondition Failed');
	public static PayloadTooLarge = new HttpResponseStatus(413, 'Payload Too Large');
	public static UriTooLong = new HttpResponseStatus(414, 'URI Too Long');
	public static UnsupportedMediaType = new HttpResponseStatus(415, 'Unsupported Media Type');
	public static RangeNotSatisfiable = new HttpResponseStatus(416, 'Range Not Satisfiable');
	public static ExpectationFailed = new HttpResponseStatus(417, 'Expectation Failed');
	public static ImATeapot = new HttpResponseStatus(418, 'I\'m a teapot');
	public static EnhanceYourCalm = new HttpResponseStatus(420, 'Enhance Your Calm'); // Twitter Joke
	public static MisdirectedRequest = new HttpResponseStatus(421, 'Misdirected Request');
	public static UnprocessableEntity = new HttpResponseStatus(422, 'Unprocessable Entity');
	public static Locked = new HttpResponseStatus(423, 'Locked');
	public static FailedDependency = new HttpResponseStatus(424, 'Failed Dependency');
	public static TooEarly = new HttpResponseStatus(425, 'Too Early');
	public static UpgradeRequired = new HttpResponseStatus(426, 'Upgrade Required');
	public static PreconditionRequired = new HttpResponseStatus(428, 'Precondition Required');
	public static TooManyRequests = new HttpResponseStatus(429, 'Too Many Requests');
	public static RequestHeaderFieldsTooLarge = new HttpResponseStatus(431, 'Request Header Fields Too Large');
	public static UnavailableForLegalReasons = new HttpResponseStatus(451, 'Unavailable For Legal Reasons');
	public static InternalServerError = new HttpResponseStatus(500, 'Internal Server Error');
	public static NotImplemented = new HttpResponseStatus(501, 'Not Implemented');
	public static BadGateway = new HttpResponseStatus(502, 'Bad Gateway');
	public static ServiceUnavailable = new HttpResponseStatus(503, 'Service Unavailable');
	public static GatewayTimeout = new HttpResponseStatus(504, 'Gateway Timeout');
	public static HttpVersionNotSupported = new HttpResponseStatus(505, 'HTTP Verson Not Supported');
	public static VariantAlsoNegotiates = new HttpResponseStatus(506, 'Variant Also Negotiates');
	public static InsufficientStorage = new HttpResponseStatus(507, 'Insufficient Storage');
	public static LoopDetected = new HttpResponseStatus(508, 'Loop Detected');
	public static NotExtended = new HttpResponseStatus(510, 'Not Extended');
	public static NetworkAuthenticationRequired = new HttpResponseStatus(511, 'Network Authentication Required');
	
	public static FromCodeNumber(unvalidatedStatusCode: number): Result<HttpResponseStatus, Fault> {

		const {
			Ok,
			Created,
			NoContent,
			NotModified,
			BadRequest,
			Unauthorized,
			Forbidden,
			NotFound,
			Conflict,
			InternalServerError,
			...Others
		} = HttpResponseStatus

		const topStatuses = [
			Ok,
			Created,
			NoContent,
			NotModified,
			BadRequest,
			Unauthorized,
			Forbidden,
			NotFound,
			Conflict,
			InternalServerError,
		];

		for (const status of topStatuses) {
			if (status.code === unvalidatedStatusCode) {
				return Result.Success(status);
			}
		}

		for (const maybeStatusName in Others) {
			const maybeStatus = (Others as Record<string, any>)[maybeStatusName];
			if (maybeStatus instanceof HttpResponseStatus) {
				const status = maybeStatus;
				if (status.code === unvalidatedStatusCode) {
					return Result.Success(status);
				}
			}
		}
	
		// TODO -- split up unknown vs invalid?
		return Result.Failure(
			Fault.Root('Unknown or invalid http status code', {
				statusCode: String(unvalidatedStatusCode)
			})
		);
	}

	public get isInformation(): boolean {
		return String(this.code)[0] === '1';
	}

	public get isSuccess(): boolean {
		return String(this.code)[0] === '2';
	}

	public get isRedirect(): boolean {
		return String(this.code)[0] === '3';
	}

	public get isBadRequest(): boolean {
		return String(this.code)[0] === '4';
	}

	public get isServerError(): boolean {
		return String(this.code)[0] === '5';
	}
}