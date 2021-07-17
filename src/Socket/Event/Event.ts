import { SocketClosedEvent } from "./Closed";
import { SocketErrorEvent } from "./Error";
import { SocketMessageReceivedEvent } from "./MessageReceived";
import { SocketOpenedEvent } from "./Opened";

export type SocketEvent<M,E> =
	SocketOpenedEvent |
	SocketMessageReceivedEvent<M> |
	SocketErrorEvent<E> |
	SocketClosedEvent;