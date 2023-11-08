import { RemoteDeleteNote } from '@/data/usecases';
import { DeleteNote } from '@/domain/usecases';
import { makeAxiosHttpClient, makeBookueApiUrl } from '../http';
import { CookieManagerAdapter } from '@/infra/cookie';

export const makeRemoteDeleteNote = (): DeleteNote => {
    const apiUrl = makeBookueApiUrl('')
    const axiosHttpClient = makeAxiosHttpClient()
    const cookieManagerAdapter = new CookieManagerAdapter()
    return new RemoteDeleteNote(
        cookieManagerAdapter,
        apiUrl,
        axiosHttpClient,
    )
}
