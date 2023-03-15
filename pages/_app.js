import Footer from '@/components/Footer';
import '@/styles/globals.css';
import '@/styles/main.css';
import styles from '@/styles/Home.module.css';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import { useAppStore } from '@/store/store';
import { useEffect } from 'react';
import Head from 'next/head';

function App({ Component, pageProps }) {
  const { setItems, items } = useAppStore();

  useEffect(() => {
    if (!items?.length) {
      setItems(pageProps.data);
    }
  }, [pageProps.data, setItems, items]);

  return (
    <div className={styles.container}>
      <Head>
        <title>The best movie app</title>
        <meta name="description" content="Movie app"></meta>
        <link ref="icon" href="/favicon.ico"></link>
      </Head>
      <main className={styles.main}>
        <Component {...pageProps} />
        <Footer />
      </main>
    </div>
  );
}

App.getInitialProps = async ({ Component }) => {
  const pageProps = Component.getInitialProps;

  const { data } = await axios.get(`${BASE_URL}/api/movies`);

  return { pageProps: { ...pageProps, data } };
};

export default App;
