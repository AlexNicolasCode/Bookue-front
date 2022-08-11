import { faker } from "@faker-js/faker";

import { FieldValidation } from "@/validation/protocols";
import { InvalidEmailError } from "@/domain/errors";

class EmailValidation implements FieldValidation {
    constructor (readonly field: string) {}

    validate (input: object): Error {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        return (!input[this.field] || emailRegex.test(input[this.field])) ? null : new InvalidEmailError()
    }
}

describe('EmailValidation', () => {
    test('Should return error if email is invalid', () => {
        const field = faker.database.column()
        const sut = new EmailValidation(field)

        const error = sut.validate({ [field]: faker.random.word() })

        expect(error).toEqual(new InvalidEmailError())
    })
})