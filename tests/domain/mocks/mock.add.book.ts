import { AddBook } from '@/domain/usecases';

import { faker } from '@faker-js/faker';

export const mockAddBookParams = (): AddBook.Params => {
    const pages = faker.datatype.number();
    return {
        title: faker.random.words(),
        author: faker.random.words(),
        description: faker.random.words(),
        currentPage: pages,
        pages: pages,
    };
};
