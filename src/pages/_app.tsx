import { AppProvider } from '@lib/context';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Head>
        <title>POS Software</title>
        <meta name="description" content="Modern POS solution for businesses" />
      </Head>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default App;
