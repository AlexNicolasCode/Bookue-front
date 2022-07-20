import { RemoteAddAccount } from '@/data/usecases/remote.add.account';
import { AddAccount } from '@/domain/usecases';
import { makeAxiosHttpClient, makeBookueApiUrl } from '../http';

export const makeRemoteAddAccount = (): AddAccount => new RemoteAddAccount(makeBookueApiUrl(''), makeAxiosHttpClient());
