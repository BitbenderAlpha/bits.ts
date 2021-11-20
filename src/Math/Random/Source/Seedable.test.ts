import { PositiveInteger } from "../../..";
import { RandomDie } from "../Fun/Die";
import { SeedableRandomSource } from "./Seedable";

test('SeedableRandomSource', () => {

	const seed = PositiveInteger.From(12341234).orDie();
	const source = new SeedableRandomSource(seed);
	expect(source.sample().value).toBeCloseTo(0.005746834914082119, 15);
	expect(source.sample().value).toBeCloseTo(0.4054681376579535, 15);
	expect(source.sample().value).toBeCloseTo(0.3524728870729324, 15);
	expect(source.sample().value).toBeCloseTo(0.21873189751931088, 15);
	expect(source.sample().value).toBeCloseTo(0.4074251546559041, 15);
	expect(source.sample().value).toBeCloseTo(0.8196403951475585, 15);
	expect(source.sample().value).toBeCloseTo(0.8615141677956628, 15);
	expect(source.sample().value).toBeCloseTo(0.15039366444125477, 15);
	expect(source.sample().value).toBeCloseTo(0.6525762438087613, 15);
	expect(source.sample().value).toBeCloseTo(0.5078648927192506, 15);
	expect(source.sample().value).toBeCloseTo(0.1462364509451373, 15);
	expect(source.sample().value).toBeCloseTo(0.9797235727215761, 15);
	expect(source.sample().value).toBeCloseTo(0.23657884320084882, 15);
	expect(source.sample().value).toBeCloseTo(0.8973401481738966, 15);

	const die = new RandomDie(PositiveInteger.From(6).orDie(), source);
	let iterations = 6000;
	const counts = new Array(die.sideCount.value).fill(0);
	while (iterations--) counts[die.roll().value-1]++;
	expect(counts).toEqual([1013, 995, 1016, 1020, 953, 1003]);
});