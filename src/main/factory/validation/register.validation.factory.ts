import { ValidationBuilder as Builder } from '@/main/builders'
import { ValidationComposite } from '@/main/composites'

export const makeRegisterValidation = () =>
  ValidationComposite.build([
    ...Builder.field('name').required().build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().build(),
    ...Builder.field('password').required().sameAs('passwordConfirmation').build(),
  ])
