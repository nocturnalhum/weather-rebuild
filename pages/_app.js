import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps, title }) {
  return (
    <>
      <Head>
        <title>{title ? title + '- Weather' : 'Weather'}</title>
        <meta name='description' content='Weather App' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
