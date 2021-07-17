import { IterableEventEmitter } from "../../Event/Emitter/Iterable";
import { SocketClosedEvent } from "../../Socket/Event/Closed";
import { SocketErrorEvent } from "../../Socket/Event/Error";
import { SocketEvent } from "../../Socket/Event/Event";
import { SocketMessageReceivedEvent } from "../../Socket/Event/MessageReceived";
import { SocketOpenedEvent } from "../../Socket/Event/Opened";
import { SocketInterface } from "../../Socket/Interface";

export class WebSocket implements SocketInterface<string, string, string> {

	private native: globalThis.WebSocket | null = null;

	private readonly iterableEmitter = new IterableEventEmitter<SocketEvent<string,string>>()

	public constructor(
		private readonly url: string,
		private readonly protocols: string[] = [],
		private readonly webGlobal = window
	) {}

	public async * [Symbol.asyncIterator]() {
		for await (const e of this.iterableEmitter) yield e;
	}

	public get isOpen() {
		return !!this.native && (this.native.readyState === this.native.OPEN);
	}

	public open() {
		try {
			this.native =
				new this.webGlobal.WebSocket(this.url, this.protocols);

			this.native.onopen =
				() => this.emit(new SocketOpenedEvent());

			this.native.onmessage =
				(e: MessageEvent) => this.emit(new SocketMessageReceivedEvent(e.data as string));

			this.native.onerror =
				(e: Event) => this.emit(new SocketErrorEvent(String(e)));

			this.native.onclose = () => {
				this.emit(new SocketClosedEvent());
			}

		} catch (error: unknown) {
			this.emit(new SocketErrorEvent(String(error)))
		}
	}

	public send(message: string) {
		try {
			if (this.native && this.isOpen) {
				this.native.send(message);
			} else {
				this.emit(new SocketErrorEvent('Cannot send -- socket not open'));
			}
		} catch (error: unknown) {
			this.emit(new SocketErrorEvent(String(error)));
		}
	}

	public close() {
		try {
			if (this.native && this.isOpen) {
				this.native.close();
			} else {
				this.emit(new SocketErrorEvent('Cannot close -- socket not open'));
			}
		} catch (error: unknown) {
			this.emit(new SocketErrorEvent(String(error)));
		}
	}

	private emit(event: SocketEvent<string, string>) {
		this.iterableEmitter.emit(event);
	}
}