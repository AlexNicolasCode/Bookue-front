import { RemoteAddBook } from '@/data/usecases';
import { AddBook } from '@/domain/usecases';
import { makeAxiosHttpClient, makeBookueApiUrl } from '../http';
import { CookieManagerAdapter } from '@/infra/cookie';

export const makeRemoteAddBook = (): AddBook => new RemoteAddBook(
    makeBookueApiUrl(''),
    makeAxiosHttpClient(),
    new CookieManagerAdapter()
);
