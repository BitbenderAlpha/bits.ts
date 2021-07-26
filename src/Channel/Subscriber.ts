import { NonEmptyArray } from "../Array/NonEmpty";

type QueueEntry<M> = {
	message: M,
	resolve: () => void,
};

type ChannelState<M> =
	{ name: 'WAIT', send: (m: M) => void } |
	{ name: 'BUSY', queue: NonEmptyArray<QueueEntry<M>> } |
	{ name: 'DEAD'}

export class ChannelSubscriber<M> implements AsyncIterableIterator<M> {

	private readonly close: () => void;

	public constructor(
		addToChannel: (publish: (m: M) => Promise<void>) => void,
		removeFromChannel: (publish: (m: M) => Promise<void>) => void,
	) {
		const boundPublish = this.publish.bind(this);
		
		addToChannel(boundPublish);
		this.close = () => removeFromChannel(boundPublish);	
	}

	public [Symbol.asyncIterator]() {
		return this;
	}

	private state: ChannelState<M> = {
		name: 'WAIT',
		send: () => {}
	};

	public next(): Promise<IteratorResult<M,void>> {

		if (this.state.name === 'DEAD') {
			return Promise.resolve({
				value: void 0,
				done: true
			});
		}

		if (this.state.name === 'BUSY') {
			// Shift queue. Resolve
			const [head, nullOrQueue] = this.state.queue.shiftLeft();
			head.resolve();

			// Keep going if there's more
			if (nullOrQueue !== null) {
				this.state.queue = nullOrQueue;
				return Promise.resolve({
					value: this.state.queue.head.message,
					done: false,
				});
			}
			// intentional fallthrough to 'WAIT' state here
		}

		return new Promise<IteratorResult<M,void>>( resolve => {
			this.state = {
				name: 'WAIT',
				send(message: M) {
					resolve({
						value: message,
						done: false
					});
				}
			}
		});
	}

	public return(): Promise<IteratorResult<M,void>> {
		// CleanUp
		if (this.state.name === 'BUSY') {
			for (const entry of this.state.queue) {
				entry.resolve();
			}
		}
		this.state = { name: 'DEAD' };
		this.close();
		return Promise.resolve({
			value: void 0,
			done: true
		}); 
	}

	private publish(message: M): Promise<void> {
		return new Promise<void>( resolve => {
			const entry = { message, resolve };
			switch (this.state.name) {
				case 'WAIT':
					this.state.send(message);
					this.state = {
						name: 'BUSY',
						queue: NonEmptyArray.FromArray([ entry ]).orDie(),
					};
					break;
				case 'BUSY':
					this.state.queue = this.state.queue.concat(entry)
					break;
			}
		});
	}
}

