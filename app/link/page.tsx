"use client";

import { useEffect, useState } from "react";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import ServerStatus from "../components/serverStatus";
import tokenService from "../services/token.service";
import home from "../services/home.service";
import auth from "../services/auth.service";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import {
    logout,
    setCharList,
    //   setLoginInfo,
  } from "@/lib/features/auth/authSlice";

export default function Inspect() {
    const router = useRouter();
  const dispatch = useAppDispatch();
  const [listChar, setListChar] = useState([]);
  const [char, setChar] = useState("0");
  const [statusDiscord, setStatusDiscord] = useState(false);
  const [idDiscord, setIdDiscord] = useState("");

  useEffect(() => {
    if (tokenService.getToken() == null) router.push("/");
    else {
      getInfo();
      getChar();
    }
  }, []);

  const getInfo = () => {
    home
      .discord({ action: "info" })
      .then((res) => {
        if (res.flag == 1) {
          setStatusDiscord(res.data.status);
          setIdDiscord(res.data.discordid);
        } else if (res.flag == -99) {
          dispatch(logout());
          router.push("/");
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getChar = () => {
    auth.getCharList({ action: "characters" })
      .then((res) => {
        if (res.flag == 1) {
          setListChar(res.data);
          dispatch(setCharList(res.data));
          if (res.data.length > 0) setChar(res.data[0].charid);
        } else if (res.flag == -99) {
          dispatch(logout());
          router.push("/");
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitChar = () => {
    if (char == "0") {
      alert("Please select your character");
      return false;
    }
    const params = {
      action: "setchar",
      charid: char,
    };
    home
      .discord(params)
      .then((res) => {
        if (res.flag == 1) {
          window.open(res.data, "_blank");
        } else if (res.flag == -99) {
          dispatch(logout());
          router.push("/");
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlink = () => {
    const params = { action: "unlink" };
    home
      .discord(params)
      .then((res) => {
        if (res.flag == 1) {
          getInfo();
        } else if (res.flag == -99) {
          dispatch(logout());
          router.push("/");
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="relative flex flex-col justify-start font-sans bg-[url(/images/home_main_bg.webp),_url(/images/home_header_bg.webp)] bg-[contain, contain] bg-position-[center_190px,top] sm:bg-position-[center_250px,top] md:bg-position-[center_250px,top] lg:bg-position-[center_250px,top] bg-size-[130%] lg:bg-auto bg-no-repeat bg-blend-normal ">
      <Header />
      <div className="mt-10">
        <ServerStatus />
      </div>
      <div className="my-10">
        <div className="w-[95%] max-w-[1200px] bg-[#222222] border-2 border-gray-500 shadow-2xl m-auto py-8 px-2">
          <div className="text-lg text-center font-bold pb-5">LINK</div>
          <div className="w-full">
          <div className="w-full max-w-[1220px] m-auto px-2 mb-12 mt-6 relative">
            <div className="py-6 bg-gray-900 rounded-2xl shadow-2xl">
              <div className="flex w-full max-w-[600px] items-center justify-center gap-4 m-auto">
                <div className="field">
                  <select
                    value={char}
                    onChange={(e) => setChar(e.target.value)}
                  >
                    <option value={"0"} disabled>
                      SELECT CHARACTER
                    </option>
                    {listChar.map((item: any, idx) => (
                      <option key={idx} value={item.id}>
                      {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button
                    type="button"
                    className="text-white bg-[#0F52C5] border-0 rounded-lg font-bold text-base py-1 px-4"
                    onClick={submitChar}
                    disabled={statusDiscord}
                  >
                    Link Discord
                  </button>
                </div>
              </div>
              <div className="mt-5 w-[95%] sm:w-[80%] m-auto text-gray-400 flex items-center justify-between">
                <div className="px-2">
                  Discord{" "}
                  {idDiscord != "" ? (
                    <>
                      <span>: </span>
                      <span className="text-amber-500">{idDiscord}</span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="px-2 flex">
                  <button
                    type="button"
                    className="text-amber-500 border border-amber-500 rounded-lg text-base py-1 px-1 mr-2 hover:cursor-pointer"
                    onClick={getInfo}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </button>
                  {statusDiscord && (
                    <button
                      type="button"
                      className="text-gray-800 bg-[#F0BD3A] border-0 rounded-lg font-bold text-base py-1 px-4"
                      onClick={unlink}
                    >
                      Un-Link
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
