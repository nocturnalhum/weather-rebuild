import Head from 'next/head';
import { Inter } from 'next/font/google';
import Search from './components/Search';
import Layout from './components/Layout';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Layout main={<div>Home</div>} />
    </>
  );
}
