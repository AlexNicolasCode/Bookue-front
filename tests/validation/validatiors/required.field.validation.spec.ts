import { faker } from "@faker-js/faker"

import { FieldValidation } from "@/validation/protocols";
import { RequiredFieldError } from "@/validation/errors";

class RequiredFieldValidation implements FieldValidation {
    constructor (readonly field: string) {}

    validate (input: object): Error {
        return input[this.field] ? null : new RequiredFieldError()
    }
}

describe('RequiredFieldValidation', () => {
    test('Should return error if field is empty', () => {
        const field = faker.database.column()
        const sut = new RequiredFieldValidation(field)

        const error = sut.validate({ [field]: '' })

        expect(error).toEqual(new RequiredFieldError())
    })
})