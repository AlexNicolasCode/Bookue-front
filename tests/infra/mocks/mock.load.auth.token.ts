import { faker } from '@faker-js/faker'
import cookieManager from 'js-cookie'

export const mockCookieManager = (
  value: string = faker.datatype.uuid()
): jest.Mocked<typeof cookieManager> => {
  const mockedCookieManager = cookieManager as jest.Mocked<typeof cookieManager>
  jest
    .spyOn(mockedCookieManager, 'get')
    .mockClear()
    .mockReturnValueOnce(value as any)
  jest.spyOn(mockedCookieManager, 'set').mockClear().mockReturnValueOnce(undefined)
  return mockedCookieManager
}
