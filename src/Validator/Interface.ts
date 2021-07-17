import { Result } from "../Result/Result";

export interface ValidatorInterface<T> {
	validate(value: unknown, name: string): Result<T, string>;
	or<U>(validator: ValidatorInterface<U>): ValidatorInterface<T|U>;
}