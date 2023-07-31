import { faker } from "@faker-js/faker"

import { GreaterThanFieldError } from "@/validation/errors"
import { FieldValidation } from "../protocols"

export class GreaterThanEqualValidation implements FieldValidation {
    constructor (
      readonly field: string,
      private readonly fieldToCompare: string
    ) {}
  
    validate (input: object): Error {
      return input[this.field] >= input[this.fieldToCompare] ?
      null :
      new GreaterThanFieldError(this.field, this.fieldToCompare)
    }
}

describe('GreaterThanEqualValidation', () => {
  test('Should return error if first field is less than second field', () => {
    const field = faker.random.word()
    const fieldToCompare = faker.random.word()
    const input = {
      [field]: faker.datatype.number({ max: 99 }),
      [fieldToCompare]: faker.datatype.number({ min: 100 })
    }
    const sut = new GreaterThanEqualValidation(field, fieldToCompare)

    const error = sut.validate(input)

    expect(error).toEqual(new GreaterThanFieldError(field, fieldToCompare))
  })

  test('Should return none error if first field greater than the second field', () => {
    const field = faker.random.word()
    const fieldToCompare = faker.random.word()
    const input = {
      [field]: faker.datatype.number({ min: 100  }),
      [fieldToCompare]: faker.datatype.number({ max: 99 })
    }
    const sut = new GreaterThanEqualValidation(field, fieldToCompare)

    const error = sut.validate(input)

    expect(error).toBeNull()
  })
})