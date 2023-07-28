import { BookModel } from "@/domain/models";
import { faker } from "@faker-js/faker";

export const mockBook = (): BookModel => ({
    id: faker.datatype.uuid(),
    title: faker.datatype.string(),
    author: faker.datatype.string(),
    description: faker.datatype.string(),
    currentPage: faker.datatype.number({ max: 20 }),
    pages: faker.datatype.number({ min: 20 }),
    createdAt: `${Date.now()}`,
});