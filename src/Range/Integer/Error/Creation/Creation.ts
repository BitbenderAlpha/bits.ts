import { NonIntegerMaxParameterIntegerRangeCreationError } from "./NonIntegerParameter/Max";
import { NonIntegerMinParameterIntegerRangeCreationError } from "./NonIntegerParameter/Min";
import { ReversedParametersIntegerRangeCreationError } from "./ReversedParameters";

export type IntegerRangeCreationError =
	NonIntegerMinParameterIntegerRangeCreationError	|
	NonIntegerMaxParameterIntegerRangeCreationError	|
	ReversedParametersIntegerRangeCreationError;