import React, { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@components';
import { HomeLayout } from '@layouts';
import * as placeholder from '../assets/data/placeholderData';

const Home = () => {
  return (
    <>
      <Head>
        <title>Memoria2 Template</title>
        <meta content='Memoria2 Template' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <section className='flex flex-col row-start-2 justify-center items-center'>
        <section className='text-center'>
          <h1 className='my-4 text-4xl text-white'>{placeholder.siteSettings.title}</h1>
          <h2 className='my-6 text-3xl text-white'>{placeholder.siteSettings.type}</h2>
        </section>
        <section className='flex justify-center'>
          <Link href='/site/startpagina/page'>
            <a>
              <Button>{placeholder.siteSettings.title}</Button>
            </a>
          </Link>
        </section>
      </section>
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};
