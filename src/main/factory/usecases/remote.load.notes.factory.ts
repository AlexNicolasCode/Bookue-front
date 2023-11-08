import { RemoteLoadNotes } from '@/data/usecases';
import { LoadNotes } from '@/domain/usecases';
import { makeAxiosHttpClient, makeBookueApiUrl } from '../http';

export const makeRemoteLoadNotes = (): LoadNotes => {
    const apiUrl = makeBookueApiUrl('')
    const axiosHttpClient = makeAxiosHttpClient()
    return new RemoteLoadNotes(
        apiUrl,
        axiosHttpClient,
    )
}
