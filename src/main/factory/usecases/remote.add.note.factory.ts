import { RemoteAddNote } from '@/data/usecases';
import { AddNote } from '@/domain/usecases';
import { makeAxiosHttpClient, makeBookueApiUrl } from '../http';
import { CookieManagerAdapter } from '@/infra/cookie';

export const makeRemoteAddNote = (): AddNote => {
    const apiUrl = makeBookueApiUrl('')
    const axiosHttpClient = makeAxiosHttpClient()
    const cookieManagerAdapter = new CookieManagerAdapter()
    return new RemoteAddNote(
        cookieManagerAdapter,
        apiUrl,
        axiosHttpClient,
    )
}
