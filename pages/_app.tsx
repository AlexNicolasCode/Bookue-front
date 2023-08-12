import type { AppProps } from 'next/app'

import { AlertProvider } from '@/presentation/contexts'
import { useAlert } from '@/presentation/hook'

import '@/presentation/styles/reset.styles.css'
import '@/presentation/styles/global.styles.css'

export default function MyApp({ Component, pageProps }: AppProps) {
    const { renderAlert } = useAlert()
    return (
        <AlertProvider>
            <Component {...pageProps} />
            {renderAlert()}
        </AlertProvider>
    )
}