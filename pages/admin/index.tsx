import { useEffect, useState } from "react";
import ErrorPage from "next/error";
import UPLOAD from "../../modules/uploadToGithub";
import { AiOutlineLink } from "react-icons/ai";
import { Tooltip, Button, Input } from "@nextui-org/react";
import axios from "axios";
import { IconType } from "react-icons";
import { toast } from "react-toastify";
import Load from "../../components/loading";

interface SidePage {
  Page: JSX.Element;
  Icon: IconType;
  Name: string;
}

export default function adminPanel() {
  let [admin, setIsAdmin] = useState(false);
  let [focusedPage, setFocuse] = useState(0);
  let [jungolC, setJC] = useState("");
  let [acmC, setAC] = useState("");
  let [l, sl] = useState(false);

  const LinkProblemPage = (
    <>
      {l ? <Load /> : null}
      <h1
        style={{
          marginBottom: "40px",
        }}
      >
        Link Jungol Rank To Solved.ac Rank
      </h1>
      <Input
        labelPlaceholder="Jungol Problem Code"
        style={{
          marginRight: "10px",
        }}
        onChange={(e) => {
          setJC(e.target.value);
        }}
        value={jungolC}
      ></Input>
      {"->"}
      <Input
        labelPlaceholder="Acmicpc Problem Code"
        style={{
          marginLeft: "10px",
        }}
        onChange={(e) => {
          setAC(e.target.value);
        }}
        value={acmC}
      ></Input>
      <Button
        auto
        style={{
          display: "inline",
          marginLeft: "10px",
        }}
        onClick={() => {
          sl(true);
          axios
            .get(
              `/api/JungolAC/linksa/${window.localStorage.auth_token}/${jungolC}/${acmC}`
            )
            .then((d) => {
              if (d.data == "T") {
                toast("Successfully Linked!", {
                  type: "success",
                });
              } else {
                toast("Error occurred while linking", {
                  type: "error",
                });
              }
            })
            .catch((e) => {
              toast("Error occurred while linking", {
                type: "error",
              });
            })
            .finally(() => {
              sl(false);
            });
        }}
      >
        Link!
      </Button>
    </>
  );

  const SidePages: SidePage[] = [
    {
      Icon: AiOutlineLink,
      Page: LinkProblemPage,
      Name: "Link Jungol Rank To Solved.ac Rank",
    },
  ];

  useEffect(() => {
    axios
      .get(`/api/login/isAdmin/${window.localStorage.auth_token}`)
      .then((res) => {
        if (res.data == "T") {
          setIsAdmin(true);
        }
      })
      .catch((e) => {});
  });

  return (
    <>
      {admin ? (
        <table
          style={{
            paddingLeft: "150px",
            paddingRight: "50px",
            paddingTop: "50px",
          }}
        >
          <tr>
            <td>
              <table
                style={{
                  display: "inline",
                  marginRight: "30px",
                }}
              >
                {SidePages.map((sidePage, idx) => {
                  return (
                    <tr>
                      <td
                        style={{
                          backgroundColor:
                            idx == focusedPage ? "black" : "white",
                          borderRadius: "5px",
                        }}
                        onClick={() => {
                          setFocuse(idx);
                        }}
                      >
                        <Tooltip
                          content={sidePage.Name}
                          placement="top"
                          rounded
                          color="success"
                        >
                          <sidePage.Icon
                            size={30}
                            color={idx != focusedPage ? "black" : "white"}
                            style={{
                              transform: "translateY(2.5px)",
                              cursor: "pointer",
                            }}
                          />
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </td>
            <tr>
              <div
                style={{
                  display: "inline",
                }}
              >
                {SidePages[focusedPage].Page}
              </div>
            </tr>
          </tr>
        </table>
      ) : (
        <ErrorPage statusCode={404} title="This page could not be found" />
      )}
    </>
  );
}
