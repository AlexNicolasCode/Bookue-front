import { LoadBook } from '@/domain/usecases';
import { RemoteLoadBook } from '@/data/usecases';
import { makeAxiosHttpClient, makeBookueApiUrl } from '../http';

export const makeRemoteLoadBook = (): LoadBook => new RemoteLoadBook(makeBookueApiUrl(''), makeAxiosHttpClient());
