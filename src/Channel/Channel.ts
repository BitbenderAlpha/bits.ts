import { ChannelPublisher } from "./Publisher";
import { ChannelSubscriber } from "./Subscriber";

/**
 * Okay so the idea of this is that I want a (potentially) many-to-many messaging "channel" where the publisher and subscriber
 * roles can be split, as most components will only need one of these capabilities.
 * 
 * Other Architectural Guarantees:
 *  * Subscribers can safely do "for await of" iteration, with awaits in loop body, without missing messages
 *  * Subscribers can close as needed via `break` or `throw` ( iterator.return() )
 *  * Publishers should have the choice to await a publish, which will resolve when all subscribers have finished (or closed)
 */

type Sub<M> = (m: M) => Promise<void>;

export class Channel<M> {

	private subs: Sub<M>[] = [];

	private addSub(sub: Sub<M>) {
		this.subs.push(sub);
	}

	private removeSub(sub: Sub<M>) {
		this.subs = this.subs.filter( s => s !== sub);
	}

	public getSubscriber(): ChannelSubscriber<M> {
		return new ChannelSubscriber<M>(
			this.addSub.bind(this),
			this.removeSub.bind(this),
		);
	}
	
	public getPublisher(): ChannelPublisher<M> {
		return new ChannelPublisher((message: M) => 
			Promise
				.all(this.subs.map( f => f(message)))
				.then( () => void 0 ),
		);
	}

	public get subscriberCount() {
		return this.subs.length;
	}
	
}