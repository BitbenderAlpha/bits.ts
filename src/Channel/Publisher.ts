// Very little going on here.
export class ChannelPublisher<M> {
	public constructor(
		public readonly publish: (message: M) => Promise<void>,
	) {}
}