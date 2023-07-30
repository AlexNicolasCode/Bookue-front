import { CookieManagerAdapter } from '@/infra/cookie';

import { faker } from '@faker-js/faker';
import { mockCookieManager } from '../mocks';

describe('CookieManagerAdapter', () => {
  describe('load()', () => {
    test('should call cookieManager with correct key', async () => {
      const fakeKey = faker.random.word();
      const sut = new CookieManagerAdapter();
      const mockedCookieManager = mockCookieManager();

      await sut.load(fakeKey);

      expect(mockedCookieManager.get).toHaveBeenCalledWith(fakeKey);
    });

    test('should return undefined if not found value', async () => {
      const fakeKey = faker.random.word();
      const sut = new CookieManagerAdapter();
      mockCookieManager(null as any);

      const value = await sut.load(fakeKey);

      expect(value).toBeFalsy();
    });

    test('should return correct value on success', async () => {
      const fakeKey = faker.random.word();
      const fakeToken = faker.datatype.uuid();
      const sut = new CookieManagerAdapter();
      mockCookieManager(fakeToken);

      const value = await sut.load(fakeKey);

      expect(value).toBe(fakeToken);
    });
  });

  describe('set()', () => {
    test('should call cookieManager with correct values', async () => {
      const fakeKey = faker.random.word();
      const fakeValue = faker.datatype.uuid();
      const sut = new CookieManagerAdapter();
      const mockedCookieManager = mockCookieManager();

      await sut.set(fakeKey, fakeValue);

      expect(mockedCookieManager.set).toHaveBeenCalledWith(fakeKey, fakeValue);
    });
  });
});
