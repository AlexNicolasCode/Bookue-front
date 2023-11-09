import { LoadBook } from '@/domain/usecases'
import { RemoteLoadBook } from '@/data/usecases'
import { makeAxiosHttpClient, makeBookueApiUrl } from '../http'

export const makeLoadBook = (): LoadBook =>
  new RemoteLoadBook(makeBookueApiUrl(''), makeAxiosHttpClient())
