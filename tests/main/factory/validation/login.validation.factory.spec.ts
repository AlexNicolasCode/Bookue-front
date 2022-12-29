import { ValidationComposite } from "@/main/composites"
import { makeLoginValidation } from "@/main/factory/validation"
import { EmailValidation, RequiredFieldValidation } from "@/validation/validators"


describe('LoginValidationFactory', () => {
    test('Should make ValidationComposite with correct validations', () => {
        const composite = makeLoginValidation()

        expect(composite).toEqual(ValidationComposite.build([
            new RequiredFieldValidation('email'),
            new EmailValidation('email'),
            new RequiredFieldValidation('password'),
        ]))
    })
})