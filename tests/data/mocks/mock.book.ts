import { faker } from "@faker-js/faker";

import { BookModel } from "@/domain/models";

export const mockBook = (): BookModel => ({
    id: faker.datatype.uuid(),
    title: faker.datatype.string(),
    author: faker.datatype.string(),
    description: faker.datatype.string(),
    currentPage: faker.datatype.number({ max: 20 }),
    pages: faker.datatype.number({ min: 20 }),
    createdAt: `${Date.now()}`,
});

export const mockBookList = (): BookModel[] => {
    let books: BookModel[];
    for (let i; i >= faker.datatype.number({ min: 1, max: 15 }); i++) {
        books[i] = mockBook()
    }
    return books
};