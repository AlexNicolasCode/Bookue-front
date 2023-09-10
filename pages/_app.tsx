import type { AppProps } from 'next/app'

import { AlertProvider, ModeProvider } from '@/presentation/contexts'

import '@/presentation/styles/reset.styles.css'
import '@/presentation/styles/global.styles.css'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AlertProvider>
            <ModeProvider>
                <Component {...pageProps} />
            </ModeProvider>
        </AlertProvider>
    )
}