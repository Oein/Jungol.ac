import type { AppProps } from "next/app";
import "./Jua.css";
import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { scaleDown as Menu } from "react-burger-menu";
import Link from "next/link";
import NoSSR from "react-no-ssr";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      id="outer-container"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        overflow: "auto",
      }}
    >
      <Head>
        <meta name="author" content="Oein" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jungoler.vercel.app/" />
        <meta property="og:site_name" content="Jungoler" />
        <meta
          property="description"
          name="description"
          content="Jungol.co.kr을 사용하는 사람들의 모임"
        />
        <meta
          property="og:description"
          content="Jungol.co.kr을 사용하는 사람들의 모임"
        />
      </Head>
      <Menu pageWrapId="page-warp" outerContainerId="outer-container">
        <NoSSR>
          <div
            style={{
              borderBottom: "1px solid gray",
              marginBottom: "14.720px",
            }}
          >
            <a
              href={
                typeof window !== "undefined" &&
                localStorage.getItem("username") != null
                  ? "/logout/"
                  : "/login/"
              }
              style={{
                color: "white",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                }}
              >
                {typeof window !== "undefined" &&
                localStorage.getItem("username") != null ? (
                  <>
                    Welcome,{" "}
                    <h2
                      style={{
                        display: "inline",
                      }}
                    >
                      {localStorage.getItem("username")}!
                    </h2>
                    <p
                      style={{
                        padding: "0px",
                        margin: "0px",
                        paddingLeft: "15px",
                      }}
                    >
                      Log out
                    </p>
                  </>
                ) : (
                  "Login"
                )}
              </div>
            </a>
          </div>
        </NoSSR>
        <a href="/">
          <h1
            style={{
              margin: "0",
              padding: "0",
            }}
          >
            Jungoler
          </h1>
        </a>
        <p>&nbsp;</p>
        <a href="/JungolAC"> - Jungol.ac</a>
        <p>&nbsp;</p>
        <h3
          style={{
            margin: "0",
            padding: "0",
          }}
        >
          Our OpenAPIs
        </h3>
        <a href="/Docs/Login/"> - Login API</a>
      </Menu>
      <main id="page-warp">
        <div
          style={{
            marginTop: "90px",
          }}
        ></div>
        <Component {...pageProps} />
        <ToastContainer
          autoClose={3000}
          position="bottom-left"
          closeOnClick
          newestOnTop={false}
        />
      </main>
    </div>
  );
}

export default MyApp;
