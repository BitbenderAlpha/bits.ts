import { HttpClientInterface } from "../Http/Client/Interface";

/**
 * This will grow over time.
 */
export interface Platform {
	http: {
		client: HttpClientInterface,
	},
}