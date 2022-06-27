import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Load from "../../../components/loading";
import axios from "axios";
import { toast } from "react-toastify";
import Head from "next/head";

const problems = require("./../../../rank.json");
const problemKey = Object.keys(problems);

export default function Vote() {
  const router = useRouter();
  const [rank, setRank] = useState<number>(15);
  const [voting, setVoting] = useState<boolean>(false);

  const { idx } = router.query;

  if (!problemKey.includes(idx as string)) {
    return <></>;
  }
  const rankName = [
    "Unknown",
    "Copper 5",
    "Copper 4",
    "Copper 3",
    "Copper 2",
    "Copper 1",
    "Silver 5",
    "Silver 4",
    "Silver 3",
    "Silver 2",
    "Silver 1",
    "Gold 5",
    "Gold 4",
    "Gold 3",
    "Gold 2",
    "Gold 1",
    "Emerald 5",
    "Emerald 4",
    "Emerald 3",
    "Emerald 2",
    "Emerald 1",
    "Diamond 5",
    "Diamond 4",
    "Diamond 3",
    "Diamond 2",
    "Diamond 1",
    "Redstone 5",
    "Redstone 4",
    "Redstone 3",
    "Redstone 2",
    "Redstone 1",
  ];

  const changeHandler = (e: any) => {
    let data = e.target.value;
    setRank(data);
  };

  const voteHandler = (e: any) => {
    if (voting) return;
    setVoting(true);
    axios
      .get(
        `/api/JungolAC/rank/vote/${idx}/${rank}/${localStorage.getItem(
          "auth_token"
        )}`
      )
      .then((d) => {
        router.push("/JungolAC/");
        toast.success("Successfully voted!", {
          autoClose: 3000,
        });
        setVoting(false);
      })
      .catch((err) => {
        setVoting(false);
        toast.error("An error occurred while voting..", {
          autoClose: 3000,
        });
      });
  };

  if (window.localStorage.getItem("auth_token") == null) {
    router.push("/login");
    alert("Sorry, but you are not logged in.");
  }

  return (
    <>
      <Head>
        <title>
          Jungoler | Vote | {problems[idx as any]} # {idx}
        </title>
      </Head>
      {voting ? <Load /> : null}
      <header
        style={{
          textAlign: "center",
        }}
      >
        <h1>
          Vote rank to problem &quot;{problems[idx as any]} # {idx}&quot;
        </h1>
      </header>

      <div>
        <div
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          <img
            style={{
              height: "2em",
              display: "inline",
            }}
            src={`/JungolAC/${rank}.svg`}
            alt={rank.toString()}
          />
          <h1
            style={{
              fontSize: "2em",
              display: "inline",
              marginLeft: "10px",
            }}
          >
            {rankName[rank]}
          </h1>
        </div>

        <input
          type={"range"}
          min="0"
          max={"30"}
          value={rank}
          onChange={changeHandler}
          style={{
            appearance: "none",
            width: "100%",
            height: "2px",
            background:
              "linear-gradient(to right, rgb(45, 45, 45) -1.66667%, rgb(45, 45, 45) 1.66667%, rgb(157, 73, 0) 1.66667%, rgb(157, 73, 0) 5%, rgb(165, 79, 0) 5%, rgb(165, 79, 0) 8.33333%, rgb(173, 86, 0) 8.33333%, rgb(173, 86, 0) 11.6667%, rgb(181, 93, 10) 11.6667%, rgb(181, 93, 10) 15%, rgb(198, 119, 57) 15%, rgb(198, 119, 57) 18.3333%, rgb(56, 84, 110) 18.3333%, rgb(56, 84, 110) 21.6667%, rgb(61, 90, 116) 21.6667%, rgb(61, 90, 116) 25%, rgb(67, 95, 122) 25%, rgb(67, 95, 122) 28.3333%, rgb(73, 101, 128) 28.3333%, rgb(73, 101, 128) 31.6667%, rgb(78, 106, 134) 31.6667%, rgb(78, 106, 134) 35%, rgb(210, 133, 0) 35%, rgb(210, 133, 0) 38.3333%, rgb(223, 143, 0) 38.3333%, rgb(223, 143, 0) 41.6667%, rgb(236, 154, 0) 41.6667%, rgb(236, 154, 0) 45%, rgb(249, 165, 24) 45%, rgb(249, 165, 24) 48.3333%, rgb(255, 176, 40) 48.3333%, rgb(255, 176, 40) 51.6667%, rgb(0, 199, 139) 51.6667%, rgb(0, 199, 139) 55%, rgb(0, 212, 151) 55%, rgb(0, 212, 151) 58.3333%, rgb(39, 226, 164) 58.3333%, rgb(39, 226, 164) 61.6667%, rgb(62, 240, 177) 61.6667%, rgb(62, 240, 177) 65%, rgb(81, 253, 189) 65%, rgb(81, 253, 189) 68.3333%, rgb(0, 158, 229) 68.3333%, rgb(0, 158, 229) 71.6667%, rgb(0, 169, 240) 71.6667%, rgb(0, 169, 240) 75%, rgb(0, 180, 252) 75%, rgb(0, 180, 252) 78.3333%, rgb(43, 191, 255) 78.3333%, rgb(43, 191, 255) 81.6667%, rgb(65, 202, 255) 81.6667%, rgb(65, 202, 255) 85%, rgb(224, 0, 76) 85%, rgb(224, 0, 76) 88.3333%, rgb(234, 0, 83) 88.3333%, rgb(234, 0, 83) 91.6667%, rgb(245, 0, 90) 91.6667%, rgb(245, 0, 90) 95%, rgb(255, 0, 98) 95%, rgb(255, 0, 98) 98.3333%, rgb(255, 48, 113) 98.3333%, rgb(255, 48, 113) 101.667%)",
          }}
        />

        <button
          style={{
            right: "10px",
            position: "absolute",
            padding: "5px",
            paddingLeft: "10px",
            paddingRight: "10px",
            background: "lightgreen",
            border: "none",
            fontSize: "large",
            fontWeight: "200",
            cursor: "pointer",
          }}
          onClick={voteHandler}
        >
          Vote!
        </button>
      </div>
    </>
  );
}
