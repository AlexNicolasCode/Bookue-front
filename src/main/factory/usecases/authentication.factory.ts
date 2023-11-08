import { RemoteAuthentication } from '@/data/usecases';
import { Authentication } from '@/domain/usecases';
import { makeAxiosHttpClient, makeBookueApiUrl } from '../http';

export const makeAuthentication = (): Authentication => new RemoteAuthentication(makeBookueApiUrl(''), makeAxiosHttpClient());
