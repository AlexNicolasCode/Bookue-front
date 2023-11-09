import { ValidationBuilder as Builder } from '@/main/builders'
import { ValidationComposite } from '@/main/composites'

export const makeEditBookValidation = () =>
  ValidationComposite.build([
    ...Builder.field('title').required().build(),
    ...Builder.field('author').required().build(),
    ...Builder.field('description').required().build(),
    ...Builder.field('currentPage').required().lessThanEqual('pages').build(),
    ...Builder.field('pages').required().greaterThanEqual('currentPage').build(),
  ])
