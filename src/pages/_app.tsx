import { AppProvider } from '@lib/context';
// import WithAuth from '@modules/auth/components/WithAuth';
import WithLayout from '@base/layout/WithLayout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../@styles/main.scss';

function App({ Component, router, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Head>
        <title>Wage Provider</title>
        <meta name="description" content="Wage Provider core system dashboard" />
      </Head>
      <WithLayout pathname={router.pathname}>
        <Component {...pageProps} />
      </WithLayout>
    </AppProvider>
  );
}

export default App;
