import { faker } from "@faker-js/faker"

import { GreaterThanFieldError } from "@/validation/errors"
import { LessThanEqualValidation } from "@/validation/validators"

describe('LessThanEqualValidation', () => {
  test('Should return error if first field is greater than second field', () => {
    const field = faker.random.word()
    const fieldToCompare = faker.random.word()
    const input = {
      [field]: faker.datatype.number({ min: 100 }),
      [fieldToCompare]: faker.datatype.number({ max: 99 })
    }
    const sut = new LessThanEqualValidation(field, fieldToCompare)

    const error = sut.validate(input)

    expect(error).toEqual(new GreaterThanFieldError(field, fieldToCompare))
  })

  test('Should return none error if first field less than second field', () => {
    const field = faker.random.word()
    const fieldToCompare = faker.random.word()
    const input = {
      [field]: faker.datatype.number({ max: 99  }),
      [fieldToCompare]: faker.datatype.number({ min: 100 })
    }
    const sut = new LessThanEqualValidation(field, fieldToCompare)

    const error = sut.validate(input)

    expect(error).toBeNull()
  })

  test('Should return none error if first field equal the second field', () => {
    const field = faker.random.word()
    const fieldToCompare = faker.random.word()
    const randomNumber = faker.datatype.number()
    const input = {
      [field]: randomNumber,
      [fieldToCompare]: randomNumber,
    }
    const sut = new LessThanEqualValidation(field, fieldToCompare)

    const error = sut.validate(input)

    expect(error).toBeNull()
  })
})