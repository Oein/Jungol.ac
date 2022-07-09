import { useState } from "react";
import Load from "../../components/loading";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Login() {
  const router = useRouter();
  const { url, t } = router.query;
  const [loggingin, setLoggingIn] = useState<boolean>(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleIdChange = (e: any) => {
    setId(e.target.value);
  };

  const handlePwChange = (e: any) => {
    setPw(e.target.value);
  };

  const enterHandler = (e: any) => {
    if (e.keyCode == 13) {
      handleClick();
    }
  };

  const toToken = () => {
    let tokens = "";
    for (let i = 0; i < Math.max(id.length, pw.length); i++) {
      let dta = id.charCodeAt(i % (id.length - 1));
      let dtb = pw.charCodeAt(i % (pw.length - 1));
      let dtc = dta + dtb;
      tokens += Math.round(dtc * 2.987).toString(26);
    }
    let nId = "";
    let pls = 1;
    for (let i = 0; i < id.length; i++) {
      nId += id.charAt(i + pls);
      console.log(i + pls);
      if (pls == 1) pls = -1;
      else pls = 1;
    }

    let nToken = "";
    for (let i = 0; i < tokens.length; i++) {
      nToken += tokens.charAt(i);
      if (i < nId.length) {
        nToken += nId.charAt(i);
      }
    }

    nToken = nId.length.toString() + nToken;
    return nToken;
  };

  const handleClick = async () => {
    setLoggingIn(true);
    if (id == "") {
      setLoggingIn(false);
      toast.error("ID is empty.");
      return;
    }
    if (pw == "") {
      setLoggingIn(false);
      toast.error("Password is empty.");
      return;
    }
    let g = (await (await axios.get(`/api/login/${id}/${pw}`)).data) as any;
    if (g.State == "Fail") {
      setLoggingIn(false);
      toast.error("ID or PW is wrong. Or account is missing.");
    } else {
      setLoggingIn(false);
      localStorage.setItem("auth_token", toToken());
      localStorage.setItem("username", decodeURI(g.UserName));
      toast.success("Successfully logged in");
      if (url == undefined) router.push("/");
      else {
        if ((url as string).startsWith("/")) {
          router.push(decodeURI(url as string));
        } else {
          router.push(decodeURI(url as string) + `?auth_token${toToken()}`);
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>Jungoler | Login</title>
      </Head>
      {loggingin ? <Load /> : null}
      <header
        style={{
          textAlign: "center",
        }}
      >
        <h1
          style={{
            marginBottom: "0px",
          }}
        >
          Login to {t ? t : "Jungoler"}
        </h1>
        <h3
          style={{
            marginTop: "10px",
          }}
        >
          with jungol.co.kr account
        </h3>
      </header>
      <section
        style={{
          textAlign: "center",
        }}
      >
        <input
          type="text"
          placeholder="ID"
          style={{
            fontSize: "14px",
            width: "90vw",
            maxWidth: "400px",
            padding: "4px 12px",
          }}
          value={id}
          onChange={handleIdChange}
          onKeyUp={enterHandler}
        ></input>
        <p
          style={{
            marginTop: "0px",
            marginBottom: "0px",
            fontSize: "3px",
          }}
        >
          &nbsp;
        </p>
        <input
          type="password"
          placeholder="Password"
          style={{
            fontSize: "14px",
            width: "90vw",
            maxWidth: "400px",
            padding: "4px 12px",
          }}
          value={pw}
          onChange={handlePwChange}
          onKeyUp={enterHandler}
        ></input>
        <p
          style={{
            marginTop: "0px",
            marginBottom: "0px",
            fontSize: "3px",
          }}
        >
          &nbsp;
        </p>
        <button
          style={{
            fontSize: "14px",
            width: "90vw",
            maxWidth: "400px",
            padding: "4px 12px",
            borderRadius: "5px",
            color: "black",
            border: "none",
            backgroundColor: "#efefef",
          }}
          onClick={handleClick}
        >
          Login
        </button>

        {/* <button onClick={() => alert(toToken())} /> */}
      </section>
    </>
  );
}
