import { Validation } from "@/presentation/protocols"
import { FieldValidation } from "@/validation/protocols"

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