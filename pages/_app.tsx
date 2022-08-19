import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../layout';
import Head from 'next/head';
import { createClient, Provider } from 'urql';

export const GQL_PATH = 'http://localhost:8000/graphql';

const client = createClient({
  url: GQL_PATH,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>&quot;The Office&quot; Poll</title>
        <meta name="description" content="Vote for your favorite character from 'The Office'." />
      </Head>
      <main>
        <Provider value={client}>
          <Component {...pageProps} />
        </Provider>
      </main>
    </Layout>
  )
}

export default MyApp
