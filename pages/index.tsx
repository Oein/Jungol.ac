import type { NextPage } from "next";
import style from "./index.module.css";
import { AiOutlineGithub } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import CustomHeader from "../components/header";
import Head from "next/head";

const problems = require("./../rank.json");
const problemKey = Object.keys(problems);

const Home: NextPage = () => {
  let [searchvalue, setSearchValue] = useState("");
  let [searchAutoComplete, setSearchAC] = useState<any[]>([]);
  let [maxCountOfSearchedProblems, setMaxCountOfSearchedProblems] = useState(5);

  const onlyNumbers = (str: string) => {
    return /^[0-9]+$/.test(str);
  };

  const searchMaxValueChangeHandler = (e: any) => {
    setMaxCountOfSearchedProblems(e.target.value);
    let someThing = { target: { value: searchvalue } };
    searchValueChangeHandler(someThing, e.target.value as number);
  };

  const searchValueChangeHandler = (
    e: any,
    cnt: number = maxCountOfSearchedProblems
  ) => {
    let data = e.target.value;
    setSearchValue(e.target.value);
    if (data.length === 0) {
      setSearchAC([]);
      return;
    }

    let filterData: Object[] = [];
    problemKey.map((key, i) => {
      if ((problems[key] as string).toLocaleLowerCase().includes(data)) {
        filterData.push({ code: key, name: problems[key] as string });
      } else if (key.toString().startsWith(data.toString())) {
        filterData.push({ code: key, name: problems[key] as string });
      }
      return 0;
    });
    filterData.sort((a: any, b: any): number => {
      if (a.code == data || a.name == data) {
        return 1;
      }
      if (b.code == data || b.name == data) {
        return 1;
      }

      if (onlyNumbers(data)) {
        return (a.code as number) > (b.code as number) ? 1 : -1;
      }

      const ai = a.name.indexOf(data);
      const bi = b.name.indexOf(data);
      if (ai == bi) {
        if (a.name.length == b.name.length) return a.code > b.code ? 1 : -1;
        else return a.name.length > b.name.length ? 1 : 0;
      } else {
        return ai > bi ? 1 : -1;
      }
    });

    filterData = filterData.slice(0, cnt);

    setSearchAC(filterData);
  };
  return (
    <>
      <Head>
        <title>Jungoler | Main</title>
      </Head>
      <CustomHeader />
      <header
        className={style.header}
        style={{
          marginTop: "70px",
        }}
      >
        <h1>Jungoler</h1>
        <h3>우리들이 생각하는 문제 난이도</h3>
      </header>
      <section>
        <h2 className={style.title}>다운로드</h2>
        <article>
          <a
            href="https://github.com/Oein/JungolExtensions/tree/main/JungolRankExtension"
            className={style.dw}
          >
            <AiOutlineGithub size={"20"} />
            <div>Download on Github</div>
          </a>
        </article>
      </section>
      <section>
        <h2 className={style.title}>문제 난이도 기여</h2>
        <div className={style.search}>
          <input
            value={searchvalue}
            placeholder="문제 이름 or 문제 Code"
            className={style.searchInput}
            onChange={searchValueChangeHandler}
          />
          <select
            value={maxCountOfSearchedProblems}
            onChange={searchMaxValueChangeHandler}
            style={{
              width: "50px",
            }}
          >
            <optgroup label="검색되는 최대 문제수">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </optgroup>
          </select>
          {searchAutoComplete.length > 0 ? (
            <table
              style={{
                borderCollapse: "collapse",
                width: "calc(100% - 35px)",
                maxWidth: "1000px",
                marginLeft: "15px",
                marginTop: "5px",
              }}
            >
              <tbody
                style={{
                  width: "100%",
                  paddingLeft: "10px",
                }}
              >
                <tr className={[style.bd, style.trw].join(" ")}>
                  <td
                    style={{
                      width: "30%",
                      paddingLeft: "10px",
                    }}
                  >
                    문제 Code
                  </td>
                  <td
                    style={{
                      width: "70%",
                    }}
                  >
                    문제 이름
                  </td>
                </tr>
                {searchAutoComplete.map((item) => {
                  return (
                    <tr>
                      <>
                        <td
                          style={{
                            paddingLeft: "10px",
                            paddingTop: "5px",
                          }}
                        >
                          <Link href={`/vote/${item.code}`}>
                            {item["code"]}
                          </Link>
                        </td>
                        <td>
                          <Link href={`/vote/${item.code}`}>
                            {item["name"]}
                          </Link>
                        </td>
                      </>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Home;
