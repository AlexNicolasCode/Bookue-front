import type { AppProps } from 'next/app'

import { BookFormContextProvider } from '@/presentation/contexts'

import 'src/presentation/styles/reset.styles.css'
import 'src/presentation/styles/global.styles.css'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <BookFormContextProvider>
            <Component {...pageProps} />
        </BookFormContextProvider>
    )
}