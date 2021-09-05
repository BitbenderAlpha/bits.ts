// todo: replace number types with rational type
export class Vector2D {
	public constructor(
		public readonly x: number,
		public readonly y: number,
	) {}

	public scale(s: number) {
		return new Vector2D(
			s * this.x,
			s * this.y,
		);
	}

	public add(v: Vector2D) {
		return new Vector2D(
			this.x + v.x,
			this.y + v.y,
		);
	}

	public subtract(v: Vector2D) {
		return this.add(v.scale(-1));
	}
	
	public get squaredMagnitude() {
		return this.x*this.x + this.y*this.y;
	}

	public get magnitude() {
		return Math.sqrt(this.squaredMagnitude);
	}

	public isLongerThan(s: number) {
		return this.squaredMagnitude > (s*s);
	}

	public isShorterThan(s: number) {
		return this.squaredMagnitude < (s*s);
	}

	public get unit() {
		return this.scale(1/this.magnitude);
	}
}