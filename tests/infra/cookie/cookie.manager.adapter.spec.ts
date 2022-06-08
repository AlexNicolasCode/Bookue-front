import { mockCookieManager } from "../mocks";
import { CookieManagerAdapter } from "@/infra/cookie";

import { faker } from "@faker-js/faker";

describe('CookieManagerAdapter', () => {
    test('should call cookieManager with correct key', async () => {
        const fakeKey = faker.random.word()
        const sut = new CookieManagerAdapter()
        const mockedCookieManager = mockCookieManager()
        
        await sut.load(fakeKey)

        expect(mockedCookieManager.get).toHaveBeenCalledWith(fakeKey)
    })

    test('should return null if not found value', async () => {
        const fakeKey = faker.random.word()
        const sut = new CookieManagerAdapter()
        mockCookieManager(null)
        
        const value = await sut.load(fakeKey)

        expect(value).toBeFalsy()
    })

    test('should return correct value on success', async () => {
        const fakeKey = faker.random.word()
        const fakeToken = faker.datatype.uuid()
        const sut = new CookieManagerAdapter()
        mockCookieManager(fakeToken)
        
        const value = await sut.load(fakeKey)

        expect(value).toBe(fakeToken)
    })
})