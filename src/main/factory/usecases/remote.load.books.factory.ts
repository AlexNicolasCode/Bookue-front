import { LoadBooks } from '@/domain/usecases';
import { RemoteLoadBooks } from '@/data/usecases';
import { makeAxiosHttpClient, makeBookueApiUrl } from '../http';

export const makeRemoteLoadBooks = (): LoadBooks => new RemoteLoadBooks(makeBookueApiUrl(''), makeAxiosHttpClient());
