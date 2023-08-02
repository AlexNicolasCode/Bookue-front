import { GreaterThanFieldError } from "../errors";
import { FieldValidation } from "../protocols";

export class LessThanEqualValidation implements FieldValidation {
    constructor (
      readonly field: string,
      private readonly fieldToCompare: string
    ) {}
  
    validate (input: object): Error {
      return input[this.field] <= input[this.fieldToCompare] ?
      null :
      new GreaterThanFieldError(this.field, this.fieldToCompare)
    }
}