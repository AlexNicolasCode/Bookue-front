import { faker } from "@faker-js/faker"

import { GreaterThanFieldError } from "@/validation/errors"
import { GreaterThanEqualValidation } from "@/validation/validators"

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

    expect(error).toEqual(new GreaterThanFieldError(fieldToCompare, field))
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

  test('Should return none error if first field equal the second field', () => {
    const field = faker.random.word()
    const fieldToCompare = faker.random.word()
    const ramdomNumber = faker.datatype.number()
    const input = {
      [field]: ramdomNumber,
      [fieldToCompare]: ramdomNumber
    }
    const sut = new GreaterThanEqualValidation(field, fieldToCompare)

    const error = sut.validate(input)

    expect(error).toBeNull()
  })
})