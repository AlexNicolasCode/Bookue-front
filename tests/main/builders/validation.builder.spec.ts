import { faker } from '@faker-js/faker'

import { ValidationBuilder as sut } from '@/main/builders/validation.builder'
import {
  CompareFieldsValidation,
  EmailValidation,
  GreaterThanEqualValidation,
  LessThanEqualValidation,
  RequiredFieldValidation,
} from '@/validation/validators'

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

  test('Should return CompareFieldsValidation', () => {
    const field = faker.database.column()

    const validations = sut.field(field).sameAs(field).build()

    expect(validations).toEqual([new CompareFieldsValidation(field, field)])
  })

  test('Should return LessThanEqualValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()

    const validations = sut.field(field).lessThanEqual(fieldToCompare).build()

    expect(validations).toEqual([new LessThanEqualValidation(field, fieldToCompare)])
  })

  test('Should return GreaterThanEqualValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()

    const validations = sut.field(field).greaterThanEqual(fieldToCompare).build()

    expect(validations).toEqual([new GreaterThanEqualValidation(field, fieldToCompare)])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()

    const validations = sut.field(field).required().email().build()

    expect(validations).toEqual([new RequiredFieldValidation(field), new EmailValidation(field)])
  })
})
