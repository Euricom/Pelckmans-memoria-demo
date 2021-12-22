import React, { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { FaAngleLeft } from 'react-icons/fa';
import { DefaultLayout } from '@layouts';
import { Article, Button, Drawer, HamburgerMenu, ImageArticle, TextArticle } from '@components';
import { capitalizeString } from '@utils';
import * as placeholder from '../../../assets/data/placeholderData';

const ArticlePage = (): JSX.Element => {
  const [showDrawer, setShowDrawer] = React.useState(true);
  const router = useRouter();
  const { article, page } = router.query;

  const pageTitle = `${article && typeof article === 'string' && capitalizeString(article)} - ${
    page && typeof page === 'string' && capitalizeString(page)
  }`;

  const handleDrawerToggle = () => setShowDrawer(prevState => !prevState);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta content='Memoria 2 Site Template - Article' name='description' />
      </Head>

      <Drawer open={showDrawer} onClose={handleDrawerToggle}>
        <h2 className='mb-6 text-3xl leading-10 text-tertiary capitalize'>{article}</h2>

        <Link href='/startpagina/page'>
          <a>
            <Button startIcon={<FaAngleLeft />} verticalSpacing='small'>
              {placeholder.siteSettings.title}
            </Button>
          </a>
        </Link>
      </Drawer>
      {!showDrawer && <HamburgerMenu onClick={handleDrawerToggle} />}

      <section
        className={classNames('transition-all duration-500', {
          'w-8/12': showDrawer,
          'w-full': !showDrawer
        })}>
        <section className='grid grid-cols-4 my-16 mx-auto w-10/12'>
          <Article icon='watch'>
            <ImageArticle alt='image' src={placeholder.images[2]} />
          </Article>

          <Article icon='read' title='Lees'>
            <TextArticle>
              <p>
                Vloeren, muren en plafonds hadden fresco’s of mozaïeken. Bij een fresco werd de verf aangebracht voordat
                de laatste plaaster droog was. Er waren heel wat kleuren. Rood en geel kwamen van oker, groen van aarde,
                zwart van kool en roet, wit uit kalk. Blauw was zeer duur, want het was een mengsel van koper en glas.
                Ook met paars, gewonnen uit bepaalde zeeschelpen, kon men zijn rijkdom tonen (fresco in Romeinse villa,
                Pompeii).
              </p>
            </TextArticle>
          </Article>
        </section>
      </section>
    </>
  );
};

ArticlePage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ArticlePage;
