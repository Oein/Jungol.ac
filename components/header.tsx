import Link from "next/link";
import { useEffect } from "react";
import style from "./header.module.css";
import NoSSR from "react-no-ssr";

export default function CustomHeader() {
  let g: any;
  return (
    <header className={style.hed}>
      <Link
        href="/"
        style={{
          cursor: "pointer",
        }}
      >
        <h1
          style={{
            cursor: "pointer",
          }}
        >
          Jungoler
        </h1>
      </Link>

      <NoSSR>
        <Link
          href={
            typeof window !== "undefined" &&
            localStorage.getItem("username") != null
              ? "/logout/"
              : "/login/"
          }
        >
          <div
            style={{
              cursor: "pointer",
              right: "50px",
              position: "absolute",
            }}
          >
            {typeof window !== "undefined" &&
            localStorage.getItem("username") != null
              ? localStorage.getItem("username") + " | Log out"
              : "Login"}
          </div>
        </Link>
      </NoSSR>
    </header>
  );
}
