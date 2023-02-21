import { ValidationBuilder as Builder } from "@/main/builders";
import { ValidationComposite } from "@/main/composites";

export const makeBookFormValidation = () => ValidationComposite.build([
    ...Builder.field('title').required().build(),
    ...Builder.field('author').build(),
    ...Builder.field('description').build(),
    ...Builder.field('pages').required().sameAs('passwordConfirmation').build(),
    ...Builder.field('currentPage').required().equalLessThan('pages').build(),
])