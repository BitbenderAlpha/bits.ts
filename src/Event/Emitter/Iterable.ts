
type Listener<T> =
	(event: T) => void

export class IterableEventEmitter<T>  implements AsyncIterable<T>{

	private listeners: Listener<T>[] = []

	/**
	 * This might be the darkest spell I have ever cast
	 */
	public async * [Symbol.asyncIterator](): AsyncIterator<T, undefined, undefined> {
		while (true) yield await new Promise( l => this.listeners.push(l) );
	}

	public emit(event: T) {
		for (const emit of this.listeners) emit(event);
		this.listeners = [];
	}

}