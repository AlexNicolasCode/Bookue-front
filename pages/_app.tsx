import type { AppProps } from 'next/app'

import { AlertProvider } from '@/presentation/contexts'

import '@/presentation/styles/reset.styles.css'
import '@/presentation/styles/global.styles.css'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AlertProvider>
            <Component {...pageProps} />
        </AlertProvider>
    )
}