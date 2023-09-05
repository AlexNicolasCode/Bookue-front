import { GreaterThanFieldError } from "../errors";
import { FieldValidation } from "../protocols";

export class LessThanEqualValidation implements FieldValidation {
    constructor (
      readonly field: string,
      private readonly fieldToCompare: string
    ) {}
  
    validate (input: object): Error {
      const isValidTargetField = input[this.field] && input[this.field] !== ''
      const isValidFieldToCompare = input[this.fieldToCompare] && input[this.fieldToCompare] !== ''
      if (isValidTargetField && isValidFieldToCompare) {
        return Number(input[this.field]) <= Number(input[this.fieldToCompare]) ?
        null :
        new GreaterThanFieldError(this.field, this.fieldToCompare)
      }  
    }
}