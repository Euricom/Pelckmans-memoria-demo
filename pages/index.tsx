import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@components';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Memoria2 Template</title>
        <meta content='Memoria2 Template' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <main className="grid grid-rows-homepage-layout mx-auto min-h-screen bg-center bg-no-repeat bg-cover bg-[url('https://digitaleverkenning.pelckmans.be/memoria2-panhelleensecultuur/wp-content/uploads/sites/50/2020/09/978-90-289-9944_2_Memo_2_B.jpg')]">
        <section className='flex flex-col row-start-2 justify-center items-center'>
          <section className='text-center'>
            <h1 className='my-4 text-4xl text-white'>Hedendaagse resten van de pan-Helleense cultuur</h1>
            <h2 className='my-6 text-3xl text-white'>Digitale Exploratie</h2>
          </section>
          <section className='flex justify-center'>
            <Link href='/startpagina/default'>
              <a>
                <Button>Hedendaagse resten van de pan-Helleense cultuur</Button>
              </a>
            </Link>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Home;
