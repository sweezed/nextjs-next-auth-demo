import Layout from '../components/layout/layout';
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css';

export default function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps}
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}


