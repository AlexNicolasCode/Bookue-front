import { Validation } from "@/presentation/protocols";
import { FieldValidation } from "@/validation/protocols";
import { faker } from "@faker-js/faker";
import { FieldValidationSpy } from "tests/validation/mocks";

export class ValidationComposite implements Validation {
    private constructor (private readonly validatiors: FieldValidation[]) {}

    static build (validatiors: FieldValidation[]): ValidationComposite {
        return new ValidationComposite(validatiors)
    }

    validate (fieldName: string, input: object): string {
        const validatiors = this.validatiors.filter(v => v.field === fieldName)
        for (const validator of validatiors) {
            const error = validator.validate(input)
            if (error) {
                return error.message
            }
        }
    }
}

type SutTypes = {
    sut: ValidationComposite
    fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
    const fieldValidationsSpy = [
        new FieldValidationSpy(fieldName),
        new FieldValidationSpy(fieldName)
    ]
    const sut = ValidationComposite.build(fieldValidationsSpy)
    return {
        sut,
        fieldValidationsSpy
    }
}

describe('ValidationComposite', () => {
    test('Should return error if any validation fails', () => {
        const fieldName = faker.database.column()
        const { sut, fieldValidationsSpy } = makeSut(fieldName)
        const errorMessage = faker.random.words()
        fieldValidationsSpy[0].error = new Error(errorMessage)
        fieldValidationsSpy[1].error = new Error(faker.random.words())

        const error = sut.validate(fieldName, { [fieldName]: faker.random.word() })

        expect(error).toBe(errorMessage)
    })

    test('Should falsy if validation succeds', () => {
        const fieldName = faker.database.column()
        const { sut } = makeSut(fieldName)

        const error = sut.validate(fieldName, { [fieldName]: faker.random.word() })

        expect(error).toBeFalsy()
    })
})