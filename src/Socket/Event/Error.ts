export class SocketErrorEvent<T> {
	public constructor(
		public readonly error: T,
	) {}
}