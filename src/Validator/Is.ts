import { ArrayOfValidator } from "./ListOf"
import { ExactStringValidator } from "./Exact/String"
import { FixedNameValidator } from "./FixedName"
import { ValidatorInterface } from "./Interface"
import { JsonStringOfValidator } from "./JsonStringOf"
import { NonEmptyListOfValidator } from "./NonEmptyListOf"
import { NullValidator } from "./Null"
import { ObjectOfValidator } from "./ObjectOf"
import { RegexMatchArrayOfValidator } from "./Regex/MatchArrayOf"
import { TypeOfNumberValidator } from "./TypeOf/Number"
import { TypeOfStringValidator } from "./TypeOf/String"
import { TypeOfUndefinedValidator } from "./TypeOf/Undefined"

// Helpful shorthand system
export const Is = {
	List: { Of<T>(v: ValidatorInterface<T>) { return new ArrayOfValidator(v) } },
	Exact: { String<T extends string>(s: T) { return new ExactStringValidator<T>(s) } },
	Json: { String: { Of<T>(v: ValidatorInterface<T>) { return new JsonStringOfValidator(v) } } },
	Named<T>(n: string, v: ValidatorInterface<T>) { return new FixedNameValidator<T>(n, v) },
	Number: new TypeOfNumberValidator(),
	Object: { Of<T>(spec: { [K in keyof T]: ValidatorInterface<T[K]>}) { return new ObjectOfValidator(spec) } },
	Optional<T>(v: ValidatorInterface<T>) { return Is.Undefined.or(v) },
	Regex: { Match: { Of<T>(s: { [K in keyof T]: ValidatorInterface<T[K]>}) { return new RegexMatchArrayOfValidator<T>(s) } } },
	String: new TypeOfStringValidator(),
	Undefined: new TypeOfUndefinedValidator(),
	Non: { Empty: { List: { Of<T>(v: ValidatorInterface<T>) { return new NonEmptyListOfValidator(v) } } } },
	Null: new NullValidator(),
}