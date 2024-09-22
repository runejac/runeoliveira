import React from "react";
import Head from "next/head";

type CustomHeadProps = {
  title: string;
  content: string;
};
const CustomHead = ({ title, content }: CustomHeadProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={content} />
      <meta name="image" content="https://runeoliveira.com/og.png" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={content} />
      <meta property="og:url" content="https://runeoliveira.com/" />
      <meta property="og:image" content="https://runeoliveira.com/og.jpg" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
  );
};

export default CustomHead;
