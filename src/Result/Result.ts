export class Result<S,F> {

	private constructor(
		private readonly state: [true, S] | [false, F]
	) {}

	public get succeeded(): boolean {
		return this.state[0];
	}

	public get failed(): boolean {
		return !this.state[0];
	}

	public get value(): S|F {
		return this.state[1];
	}


	public toUnion(): { failed: false, value: S}|{ failed: true, value: F} {
		return (
			this.state[0]
				? { failed: false, value: this.state[1]}
				: { failed: true, value: this.state[1]}
		);
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

	public test<T>(test: (s:S) => boolean, replacementValue:T): Result<S,T|F> {
		return (
			this.state[0]
				? test(this.state[1])
					? Result.Success(this.state[1])
					: Result.Failure(replacementValue)
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

	public replaceSuccessWith<T>(t:T) {
		return (
			this.state[0]
				? Result.Success(t)
				: Result.Failure(this.state[1])
		);
	}

	public static FromBoolean(success: boolean) {
		return success ? Result.Success(true) : Result.Failure(false);
	}

	public toBoolean() {
		return this.state[0];
	}

	public trustMe(): S {

		if (this.state[0]) {
			return this.state[1];
		}
		
		throw new Error(`TRUST VIOLATION! -- ${this.state[1]}`)
	}

}