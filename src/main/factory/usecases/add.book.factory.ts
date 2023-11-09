import { RemoteAddBook } from '@/data/usecases'
import { AddBook } from '@/domain/usecases'
import { makeAxiosHttpClient, makeBookueApiUrl } from '../http'
import { CookieManagerAdapter } from '@/infra/cookie'

export const makeAddBook = (): AddBook => {
  const apiUrl = makeBookueApiUrl('')
  const axiosHttpClient = makeAxiosHttpClient()
  const cookieManagerAdapter = new CookieManagerAdapter()
  return new RemoteAddBook(apiUrl, cookieManagerAdapter, axiosHttpClient)
}
