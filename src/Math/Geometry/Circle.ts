import { Vector2D } from "../Vector/2D";

export class Circle {
	public constructor(
		public readonly center: Vector2D,
		public readonly radius: number, //todo: rational?
	) {}
}