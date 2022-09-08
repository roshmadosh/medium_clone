import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from 'components/layout';
import Head from 'next/head';
import { createClient, Provider } from 'urql';


export const GQL_PATH = '/api/graphql';

const client = createClient({
  url: GQL_PATH,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>A Medium Clone</title>
        <meta name="description" content="A Medium clone" />
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
