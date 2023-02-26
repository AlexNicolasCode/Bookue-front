import { RemoteAddBook } from '@/data/usecases';
import { AddBook } from '@/domain/usecases';
import { makeAxiosHttpClient, makeBookueApiUrl } from '../http';

export const makeRemoteAddAccount = (): AddBook => new RemoteAddBook(makeBookueApiUrl(''), makeAxiosHttpClient());
