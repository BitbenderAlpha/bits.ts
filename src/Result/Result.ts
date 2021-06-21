export class Result<S,F> {

	private constructor(
		private readonly state: [true, S] | [false, F]
	) {}

	public get isSuccess(): boolean {
		return this.state[0];
	}

	public get value(): S|F {
		return this.state[1];
	}

	public static Success<S>(s: S): Result<S, never> {
		return new Result<S,never>([true, s]);
	}

	public static Failure<F>(f: F): Result<never, F> {
		return new Result<never, F>([false, f]);
	}

	public map<T>(mapper: (s: S) => T): Result<T,F> {
		return (
			this.state[0]
				? Result.Success(mapper(this.state[1]))
				: Result.Failure(this.state[1])
		);
	}

	public flatMap<T,E>(mapper: (s:S) => Result<T,E>): Result<T,E|F> {
		return (
			this.state[0]
				? mapper(this.state[1])
				: Result.Failure(this.state[1])
		);
	}

	public mapFailure<E>(mapper: (s: F) => E): Result<S,E> {
		return (
			this.state[0]
				? Result.Success(this.state[1])
				: Result.Failure(mapper(this.state[1]))
		);
	}

	public replaceFailureWith<E>(e: E): Result<S,E> {
		return (
			this.state[0]
				? Result.Success(this.state[1])
				: Result.Failure(e)
		);
	}

}