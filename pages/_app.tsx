import '../styles/globals.scss'
import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}