export class SocketMessageReceivedEvent<T> {
	public constructor(
		public readonly message: T
	) {}
}