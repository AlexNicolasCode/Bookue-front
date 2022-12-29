import type { AppProps } from 'next/app'

import 'src/presentation/styles/reset.styles.css'
import 'src/presentation/styles/global.styles.css'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Component {...pageProps} />
    )
}