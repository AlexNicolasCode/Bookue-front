import { RemoteLoadNotes } from '@/data/usecases';
import { LoadNotes } from '@/domain/usecases';
import { makeAxiosHttpClient, makeBookueApiUrl } from '../http';
import { CookieManagerAdapter } from '@/infra/cookie';

export const makeRemoteLoadNotes = (): LoadNotes => {
    const apiUrl = makeBookueApiUrl('')
    const axiosHttpClient = makeAxiosHttpClient()
    const cookieManagerAdapter = new CookieManagerAdapter()
    return new RemoteLoadNotes(
        apiUrl,
        cookieManagerAdapter,
        axiosHttpClient,
    )
}
