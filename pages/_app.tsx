import type { AppProps } from "next/app";
import Head from "next/head";
import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Jua"
        />
      </Head>
      <Component {...pageProps} />
      <ToastContainer
        autoClose={3000}
        position="bottom-left"
        closeOnClick
        newestOnTop={false}
      />
    </>
  );
}

export default MyApp;
