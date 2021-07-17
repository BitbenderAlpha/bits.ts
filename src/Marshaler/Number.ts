/**
 * 
 * JavaScript numbers are IEEE 754 64-bit floats
 * 
 * Bit Reference:
 * s: sign (1 bit)
 * e: exponent (11 bits with a bias of 1023)
 * f: fraction (52 bits)
 *
 * seeeeeee eeeeffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff
 * 
 * @link https://en.wikipedia.org/wiki/Double-precision_floating-point_format
 * 
 */

export class NumberMarshaler {

	/**
	 * Offset: The location of a byte, relative to the memory address of the full 64bit number
	 * Significance: The location of a byte in terms of its significance (7 = most, 0 = least)
	 */
	private readonly byteOffsetToSignificance: Uint8Array;

	private readonly byteSignificanceToOffset: Uint8Array;

	public constructor() {

		/**
		 * The following code generates a "magic" number consisting of a eight bytes,
		 * where each byte value contains its sigificance
		 * 
		 * IEEE 754 reference         seeeeeee eeeeffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff
		 * byte significance value    00000111 00000110 00000101 00000100 00000011 00000010 00000001 00000000
		 */

		let magicNumber = 0
		magicNumber = magicNumber / 256 + 1;
		magicNumber = magicNumber / 256 + 2;
		magicNumber = magicNumber / 256 + 3;
		magicNumber = magicNumber / 256 + 4;
		magicNumber = magicNumber / 256 + 5;
		magicNumber = magicNumber / 256 + 6;
		magicNumber /= 16; // Shift right a nibble
		magicNumber += 1;  // Add the implied bit
		magicNumber *= Math.pow(2, 7 * 16 - 1023); // shift "7" left by a nibble, apply as exponent

		this.byteOffsetToSignificance = 
			new Uint8Array(Float64Array.from([magicNumber]).buffer)

		this.byteSignificanceToOffset =
			new Uint8Array(8);

		this.byteOffsetToSignificance.forEach( (significance, offset) => {
			this.byteSignificanceToOffset[significance] = offset;
		});
	}

	public numberToLittleEndianBytes(x: number): Uint8Array {
		const littleEndianByteSignificanceOrder = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);
		const bytesInOffsetOrder = this.getBytesInOffsetOrder(x);		
		return littleEndianByteSignificanceOrder
			.map( significance => this.byteSignificanceToOffset[significance] as number )
			.map( offset => bytesInOffsetOrder[offset] as number);
	}

	public numberToBigEndianBytes(x: number): Uint8Array {
		const bigEndianByteSignificanceOrder = new Uint8Array([7, 6, 5, 4, 3, 2, 1, 0]);
		const bytesInOffsetOrder = this.getBytesInOffsetOrder(x);		
		return bigEndianByteSignificanceOrder
			.map( significance => this.byteSignificanceToOffset[significance] as number )
			.map( offset => bytesInOffsetOrder[offset] as number);
	}

	private getBytesInOffsetOrder(x: number) {
		return new Uint8Array(Float64Array.from([x]).buffer)
	}
}