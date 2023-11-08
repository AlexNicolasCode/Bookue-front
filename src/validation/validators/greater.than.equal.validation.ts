import { GreaterThanFieldError } from "../errors";
import { FieldValidation } from "../protocols";

export class GreaterThanEqualValidation implements FieldValidation {
    constructor (
      readonly field: string,
      private readonly fieldToCompare: string
    ) {}
  
    validate (input: object): Error {
      const isValidTargetField = input[this.field] && input[this.field] !== ''
      const isValidFieldToCompare = input[this.fieldToCompare] && input[this.fieldToCompare] !== ''
      if (isValidTargetField && isValidFieldToCompare) {
        return input[this.field] >= input[this.fieldToCompare] ?
        null :
        new GreaterThanFieldError(this.fieldToCompare, this.field)
      }
    }
}