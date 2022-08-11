import { faker } from "@faker-js/faker";

import { FieldValidation } from "@/validation/protocols";
import { EmailValidation, RequiredFieldValidation } from "@/validation/validators";
import { ValidationBuilder as sut } from "@/main/builders/validation.builder";

describe('ValidationBuilder', () => {
    test('Should return RequiredFieldValidation', () => {
        const field = faker.database.column()

        const validations = sut.field(field).required().build()

        expect(validations).toEqual([new RequiredFieldValidation(field)])
    })

    test('Should return EmailValidation', () => {
        const field = faker.database.column()

        const validations = sut.field(field).email().build()

        expect(validations).toEqual([new EmailValidation(field)])
    })

    test('Should return a list of validations', () => {
        const field = faker.database.column()

        const validations = sut.field(field).required().email().build()

        expect(validations).toEqual([
            new RequiredFieldValidation(field),
            new EmailValidation(field),
        ])
    })
})