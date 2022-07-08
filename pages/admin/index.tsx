import { useEffect, useState } from "react";
import ErrorPage from "next/error";
import { AiOutlineLink, AiOutlineUser } from "react-icons/ai";
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
  // Global
  let [admin, setIsAdmin] = useState(false);
  let [focusedPage, setFocuse] = useState(0);
  let [l, sl] = useState(false);
  // Link Page
  let [jungolC, setJC] = useState("");
  let [acmC, setAC] = useState("");
  // Ban UnBan Page
  let [but, setBUT] = useState("");

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

  const BanUnBanPage = (
    <>
      <h1
        style={{
          marginBottom: "40px",
        }}
      >
        Ban / Unban User
      </h1>
      <Input
        labelPlaceholder="User Auth"
        value={but}
        onChange={(e) => {
          setBUT(e.target.value);
        }}
        style={{ display: "inline" }}
      />
      <Button
        style={{ display: "inline", marginLeft: "10px" }}
        color="warning"
        auto
        onClick={() => {
          sl(true);
          axios
            .get(
              `/api/adminAPIS/${window.localStorage.auth_token}/accounts/ban/${but}`
            )
            .then((res) => {
              if (res.data == "A") {
                toast("The user has already been banned", {
                  type: "info",
                });
              }
              if (res.data == "E") {
                toast("Error occurred while trying to ban the user", {
                  type: "error",
                });
              }
              if (res.data == "T") {
                toast("Successfully banned the user", {
                  type: "success",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              toast("Error occurred while trying to ban the user", {
                type: "error",
              });
            })
            .finally(() => {
              sl(false);
            });
        }}
      >
        Ban
      </Button>
      <Button
        style={{ display: "inline", marginLeft: "10px" }}
        color="success"
        auto
        onClick={() => {
          sl(true);
          axios
            .get(
              `/api/adminAPIS/${window.localStorage.auth_token}/accounts/unban/${but}`
            )
            .then((res) => {
              if (res.data == "A") {
                toast("The user has already been unbanned", {
                  type: "info",
                });
              }
              if (res.data == "E") {
                toast("Error occurred while trying to unban the user", {
                  type: "error",
                });
              }
              if (res.data == "T") {
                toast("Successfully unbanned the user", {
                  type: "success",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              toast("Error occurred while trying to unban the user", {
                type: "error",
              });
            })
            .finally(() => {
              sl(false);
            });
        }}
      >
        Unban
      </Button>
    </>
  );

  const SidePages: SidePage[] = [
    {
      Icon: AiOutlineLink,
      Page: LinkProblemPage,
      Name: "Link Jungol Rank To Solved.ac Rank",
    },
    {
      Icon: AiOutlineUser,
      Page: BanUnBanPage,
      Name: "Ban/Unban User",
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
        <>
          <table
            style={{
              display: "inline",
              position: "fixed",
              top: "100px",
              left: "100px",
            }}
          >
            {SidePages.map((sidePage, idx) => {
              return (
                <tr>
                  <td
                    style={{
                      backgroundColor: idx == focusedPage ? "black" : "white",
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
          <div
            style={{
              display: "inline",
              position: "fixed",
              left: "200px",
              top: "100px",
            }}
          >
            {SidePages[focusedPage].Page}
          </div>
        </>
      ) : (
        <ErrorPage statusCode={404} title="This page could not be found" />
      )}
    </>
  );
}
