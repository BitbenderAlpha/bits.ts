import * as https from 'https';
import { Platform } from "../Interface";
import { NodeJsHttpClient } from "./Http/Client";

export class NodeJsPlatform implements Platform {

	public constructor(
		private readonly httpsModule: typeof https
	) {}

	public get http() {
		return {
			client: new NodeJsHttpClient(this.httpsModule)
		}
	}
	
}