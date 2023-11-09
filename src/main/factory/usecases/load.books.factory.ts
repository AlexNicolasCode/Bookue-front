import { LoadBooks } from '@/domain/usecases'
import { RemoteLoadBooks } from '@/data/usecases'
import { makeAxiosHttpClient, makeBookueApiUrl } from '../http'

export const makeLoadBooks = (): LoadBooks =>
  new RemoteLoadBooks(makeBookueApiUrl(''), makeAxiosHttpClient())
