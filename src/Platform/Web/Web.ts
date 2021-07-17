import { Platform } from "../Interface";
import { WebHttpClient } from './Http/Client';
import { WebSocket } from "./Socket";

export class WebPlatform implements Platform {

	public constructor(
		private readonly webGlobal = window,
	) {}

	public get http() {
		return {
			client: new WebHttpClient(this.webGlobal)
		}
	}

	public socket(url: string, protocols: string[] = []) {
		return new WebSocket(url, protocols, this.webGlobal);
	}
	
}