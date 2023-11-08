import { faker } from "@faker-js/faker";

import { InvalidUserError } from "@/domain/errors";
import { EmailValidation } from "@/validation/validators";

describe('EmailValidation', () => {
    test('Should return error if email is invalid', () => {
        const field = faker.database.column()
        const sut = new EmailValidation(field)

        const error = sut.validate({ [field]: faker.random.word() })

        expect(error).toEqual(new InvalidUserError())
    })

    test('Should return falsy if email is valid', () => {
        const field = faker.database.column()
        const sut = new EmailValidation(field)

        const error = sut.validate({ [field]: faker.internet.email() })

        expect(error).toBeFalsy()
    })

    test('Should return falsy if email is empty', () => {
        const field = faker.database.column()
        const sut = new EmailValidation(field)

        const error = sut.validate({ [field]: '' })

        expect(error).toBeFalsy()
    })
})