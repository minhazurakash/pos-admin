'use client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

interface IMeta {
  title?: string;
  baseTitle?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  url?: string;
  keywords?: string[];
}

interface IProps extends IMeta {
  children: React.ReactNode;
}
const PageWrapper: React.FC<IProps> = ({ children, ...customMeta }) => {
  const router = useRouter();

  // const ogImageUrl = 'https://viewsbd.com/images/og-image.jpg';

  const meta: IMeta = {
    title: '',
    baseTitle: '',
    description: ``,
    // image: ogImageUrl,
    url: `http://localhost:4080${router.asPath}`,
    type: 'website',
    // keywords: ['news', 'views'],
    ...customMeta,
  };

  const generatedTitle = `${meta.title}${meta.title ? ' - ' : ''}${meta.baseTitle}`;

  return (
    <React.Fragment>
      <Head>
        <title>{generatedTitle}</title>
        <link rel="canonical" href={meta.url} />
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {children}
    </React.Fragment>
  );
};

export default PageWrapper;
