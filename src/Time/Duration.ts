import { NonNegativeInteger } from "../Numeric/Integer/NonNegative";

export class TimeDuration {

	public constructor(
		public readonly milliseconds: NonNegativeInteger,
	) {}

	public static readonly ZeroMilliseconds =
		new TimeDuration(NonNegativeInteger.From(0).orDie());

	public static FromNumberOfMilliseconds(ms: number) {
		return (
			NonNegativeInteger.From(ms)
				.map( ms => new TimeDuration(ms))
				.mapFailure( reason => `Could not parse number (${ms}) as valid nonzero milliseconds because ${reason}`)
		);
	}

	public wait(): Promise<void> {
		return new Promise( resolve => 
			setTimeout(
				resolve,
				Number(this.milliseconds)
			)
		)
	}
}