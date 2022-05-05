import { NonEmptyListOfValidator } from "./NonEmptyListOf";
import { TypeOfNumberValidator } from "./TypeOf/Number";

describe('NonEmpty List Validator', () => {
    const validator = new NonEmptyListOfValidator(new TypeOfNumberValidator())

    test('structure preservation', () => {
        const input = [1,2,3,4,5];
        const output = validator.validate(input, 'input').orDie();
        expect(Array.from(output)).toEqual(input);
    });

});
