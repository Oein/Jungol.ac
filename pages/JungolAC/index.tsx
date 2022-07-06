import type { NextPage } from "next";
import style from "./index.module.css";
import { AiOutlineGithub } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
const FHeader = dynamic(import("../../components/Fheader"));

const problems = require("./../../rank.json");
const sl = require("../../solvedaclink.json");

const Home: NextPage = () => {
  let [searchvalue, setSearchValue] = useState("");
  let [searchAutoComplete, setSearchAC] = useState<any[]>([]);
  let [maxCountOfSearchedProblems, setMaxCountOfSearchedProblems] = useState(5);

  const problemKey = Object.keys(problems);

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
      if (
        (problems[key] as string)
          .toLocaleLowerCase()
          .includes(data.toLocaleLowerCase())
      ) {
        if (sl[key] == undefined) {
          filterData.push({ code: key, name: problems[key] as string });
        }
      } else if (
        key
          .toString()
          .toLocaleLowerCase()
          .startsWith(data.toString().toLocaleLowerCase())
      ) {
        if (sl[key] == undefined) {
          filterData.push({ code: key, name: problems[key] as string });
        }
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
        <title>Jungol.ac | Main</title>
      </Head>
      <FHeader title="Jungol.ac" description="우리들이 생각하는 문제 난이도" />
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
        <h2 className={style.title}>공지사항</h2>
        <article>
          여러분들이 투표한 내역은 서버에 기록됩니다.
          <p></p>
          서버 테러 , 문제의 실제 난이도와 매우 다른 난이도 기여를 할경우 사전
          공고 없이 ban 당할 수 있습니다.
        </article>
      </section>

      <section>
        <h2 className={style.title}>문제 난이도 기여 가이드 라인</h2>
        <div className={style.search}>
          <table className={style.tsty}>
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
                  랭크
                </td>
                <td
                  style={{
                    width: "70%",
                  }}
                >
                  알고리즘
                </td>
              </tr>

              <tr key={0}>
                <>
                  <td
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  >
                    Copper 5
                  </td>
                  <td>간단한 입출력, 사칙 연산</td>
                </>
              </tr>

              <tr key={1}>
                <>
                  <td
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  >
                    Copper 4
                  </td>
                  <td>if, switch 등의 조건문</td>
                </>
              </tr>

              <tr key={2}>
                <>
                  <td
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  >
                    Copper 3
                  </td>
                  <td>for, while 등의 반복문</td>
                </>
              </tr>

              <tr key={3}>
                <>
                  <td
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  >
                    Copper 2
                  </td>
                  <td>1차원 배열, 문자열, 함수 사용</td>
                </>
              </tr>

              <tr key={4}>
                <>
                  <td
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  >
                    Copper 1
                  </td>
                  <td>다차원 배열, 재귀 호출</td>
                </>
              </tr>

              <tr key={5}>
                <>
                  <td
                    style={{
                      paddingLeft: "10px",
                      paddingTop: "5px",
                    }}
                  >
                    Silver 5
                  </td>
                  <td>각종 제곱 미만 시간 정렬 방법</td>
                </>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className={style.title}>문제 난이도 기여</h2>
        <div
          className={style.search}
          style={{
            marginBottom: "100px",
          }}
        >
          <input
            value={searchvalue}
            placeholder="문제 이름 or 문제 Code"
            className={style.searchInput}
            onChange={searchValueChangeHandler}
          />
          <select
            value={maxCountOfSearchedProblems}
            onChange={searchMaxValueChangeHandler}
            className={style.w50}
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
            <table className={style.tsty}>
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
                {searchAutoComplete.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <>
                        <td
                          style={{
                            paddingLeft: "10px",
                            paddingTop: "5px",
                          }}
                        >
                          <Link href={`/JungolAC/vote/${item.code}`}>
                            {item["code"]}
                          </Link>
                        </td>
                        <td>
                          <Link href={`/JungolAC/vote/${item.code}`}>
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
