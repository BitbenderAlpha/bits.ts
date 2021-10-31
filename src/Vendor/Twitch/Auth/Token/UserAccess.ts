import { List } from "../../../..";
import { TwitchAuthScope } from "../Scope/Type";

export class TwitchUserAccessAuthToken {
	public constructor(
		public readonly clientId: string,
		public readonly type: string,
		public readonly value: string,
		public readonly scopes: List<TwitchAuthScope>,
	) {}
}