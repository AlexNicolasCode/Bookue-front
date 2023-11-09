import { ValidationBuilder as Builder } from '@/main/builders'
import { ValidationComposite } from '@/main/composites'

export const makeLoginValidation = () =>
  ValidationComposite.build([
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().build(),
  ])
