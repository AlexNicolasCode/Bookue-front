import { faker } from "@faker-js/faker";

import { FieldValidation } from "@/validation/protocols";
import { EmailValidation, RequiredFieldValidation } from "@/validation/validators";

class ValidationBuilder {
    private constructor (
        private readonly fieldName: string,
        private readonly validations: FieldValidation[],
    ) {}

    static field (fieldName: string): ValidationBuilder {
        return new ValidationBuilder(fieldName, [])
    }

    required (): ValidationBuilder {
        this.validations.push(new RequiredFieldValidation(this.fieldName))
        return this
    }

    email (): ValidationBuilder {
        this.validations.push(new EmailValidation(this.fieldName))
        return this
    }

    build (): FieldValidation[] {
        return this.validations
    }
}

describe('ValidationBuilder', () => {
    test('Should return RequiredFieldValidation', () => {
        const field = faker.database.column()
        const sut = ValidationBuilder

        const validations = sut.field(field).required().build()

        expect(validations).toEqual([new RequiredFieldValidation(field)])
    })

    test('Should return EmailValidation', () => {
        const field = faker.database.column()
        const sut = ValidationBuilder

        const validations = sut.field(field).email().build()

        expect(validations).toEqual([new EmailValidation(field)])
    })
})