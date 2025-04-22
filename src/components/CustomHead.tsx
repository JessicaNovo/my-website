'use client';
import Head from 'next/head';

interface CustomHeadProps {
  title: string;
  description: string;
}

export default function CustomHead({ title, description }: CustomHeadProps) {
  const gtmID = 'GTM-XXXX'; // Replace with your GTM ID

  return (
    <Head>
      {/* Google Tag Manager script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmID}');
          `,
        }}
      />
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Add other global meta tags, social tags, etc. */}
    </Head>
  );
}
