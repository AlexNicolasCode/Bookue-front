import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

import { faker } from '@faker-js/faker'

export class EqualLessThanFieldsValidation implements FieldValidation {
    constructor (
        readonly field: string,
        private readonly fieldToCompare: string
    ) {}
  
    validate (input: object): Error {
        return input[this.field] <= input[this.fieldToCompare] ?
        new InvalidFieldError(`${this.field} fields comparation`) :
        null
    }
}

const makeSut = (field: string, fieldToCompare: string): EqualLessThanFieldsValidation => new EqualLessThanFieldsValidation(field, fieldToCompare)

describe('EqualLessThanFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = 'any_field'
    const fieldToCompare = 'other_field'
    const sut = makeSut(field, fieldToCompare)

    const error = sut.validate({
      [field]: '10',
      [fieldToCompare]: '100'
    })

    expect(error).toEqual(new InvalidFieldError(`${field} fields comparation`))
  })
})