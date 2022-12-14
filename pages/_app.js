import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import "../styles/globals.css";
// import "@docsearch/css";

import Layout from "../components/Layout";
import { ClerkProvider } from "@clerk/nextjs";

function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <link
          rel="preload"
          href="/api/rq?start=0&query=select%20*%20from%20people_for_user_display%20where%20(1%20=%201)%20limit%2025"
          as="fetch"
          crossorigin="anonymous"
        />
        <link
          rel="preload"
          href="https://clerk.prompt.meerkat-85.lcl.dev/npm/@clerk/clerk-js@4/dist/clerk.browser.js"
          as="fetch"
          crossorigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Redacted&family=Redacted+Script:wght@300;400;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}

export default App;
