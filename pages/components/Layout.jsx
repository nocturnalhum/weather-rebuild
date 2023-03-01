import Head from 'next/head';
import React from 'react';
import Search from './Search';

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{title ? title + ' - Weather' : 'Search Weather'}</title>
      </Head>
      <main className='min-h-screen bg-landscape bg-cover bg-center'>
        {/* Overlay  */}
        <div className='absolute left-0 right-0 top-0 bottom-0 bg-black/50' />
        <Search />
        {children}
      </main>
    </>
  );
}
