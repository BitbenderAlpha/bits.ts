export class InvalidSideCountRandomDiceCreationError {
	public constructor(
		public readonly sideCount: number
	) {}
}