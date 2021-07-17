import { SocketEvent } from "./Event/Event";

export interface SocketInterface<I,O,E> extends AsyncIterable<SocketEvent<I,E>> {
	isOpen: boolean;
	open(): void;
	send(message: O): void;
	close(): void;
}