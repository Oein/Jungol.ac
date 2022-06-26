import Head from "next/head";
import FHeader from "../../../components/Fheader";
import style from "./index.module.css";

export default function Login() {
  return (
    <>
      <FHeader title="Jungol Login API" description="Jungol Login API Docs" />
      <Head>
        <title>Jungol Login API | Docs</title>
      </Head>

      <section>
        <h2 className={style.title}>Description</h2>
        This api is available for everyone. So you don't need to get things such
        as api keys or token.
      </section>
      <section>
        <h2 className={style.title}>Usage</h2>
        <h3
          style={{
            display: "inline",
          }}
        >
          GET
        </h3>{" "}
        /login
        <div
          style={{
            marginLeft: "10px",
          }}
        >
          <h4
            style={{
              padding: "0px",
              margin: "0px",
            }}
          >
            Parms
          </h4>
          <table>
            <tr>
              <td
                style={{
                  paddingRight: "10px",
                }}
              >
                Name
              </td>
              <td
                style={{
                  paddingRight: "10px",
                }}
              >
                Type
              </td>
              <td
                style={{
                  paddingRight: "10px",
                }}
              >
                Deafault Value
              </td>
              <td
                style={{
                  paddingRight: "10px",
                }}
              >
                Description
              </td>
            </tr>
            <tr>
              <td>t</td>
              <td>String | null</td>
              <td>Jungoler</td>
              <td>It shows users which page they are logged in to</td>
            </tr>
            <tr>
              <td>url</td>
              <td>String | null</td>
              <td>/</td>
              <td>
                Tell the server which page to go to when the login is
                successful. / It must not have url query parameters
              </td>
            </tr>
          </table>

          <h3>Example</h3>
          <p>/login?url=https://github.com/&t=Github</p>
          <p>
            When it is successed, it goes to
            https://github.com/?auth_token=[Some looong token]
          </p>
        </div>
      </section>
    </>
  );
}
