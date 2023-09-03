import { ValidationBuilder as Builder } from "@/main/builders";
import { ValidationComposite } from "@/main/composites";

export const makeAddBookValidation = () => ValidationComposite.build([
    ...Builder.field('title').required().build(),
    ...Builder.field('author').build(),
    ...Builder.field('description').required().build(),
    ...Builder.field('currentPage').lessThanEqual('pages').build(),
    ...Builder.field('pages').required().greaterThanEqual('currentPage').build(),
])