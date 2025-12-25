import WithLayout from '@/@base/layout/WithLayout';
import WithAuth from '@/@modules/auth/components/WithAuth';
import { AppProvider } from '@lib/context';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

function App({ router, Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Head>
        <title>POS Software</title>
        <meta name="description" content="Modern POS solution for businesses" />
      </Head>
      <WithLayout pathname={router.pathname}>
        <Component {...pageProps} />
      </WithLayout>
    </AppProvider>
  );
}

export default WithAuth(App);
