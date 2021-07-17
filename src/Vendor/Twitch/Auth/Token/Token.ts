import { TwitchAppAccessAuthToken } from "./AppAccess";
import { TwitchUserAccessAuthToken } from "./UserAccess";

export type TwitchAuthToken =
	TwitchAppAccessAuthToken |
	TwitchUserAccessAuthToken