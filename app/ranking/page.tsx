"use client";

import LogoBanner from "@/app/components/logoBanner";
import { useEffect, useState } from "react";
import RankServices from "@/app/services/rank.service";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";

export default function Ranking() {
  const [type, setType] = useState("level");
  const [data, setData] = useState([{ name: "", list: [] }]);

  const getRank = () => {
    const params = {
      action: type,
    };
    RankServices.rank(params)
      .then((res) => {
        if (res.flag == 1) {
          setData(res.data);
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRank();
  }, [type]);

  //#region FUNCTION
  const convertOnlineTime = (seconds: number) => {
    let str = "";

    const detik = seconds % 60;

    seconds -= detik;
    const menit = seconds % 3600;
    const menitShow = menit / 60;

    seconds -= menit;
    const jam = seconds % 86400;
    const jamShow = jam / 3600;

    seconds -= jam;
    const hari = seconds % 2592000;
    const hariShow = hari / 86400;

    seconds -= hari;
    const bulan = seconds % 31104000;
    const bulanShow = bulan / 2592000;

    const tahun = Math.floor(seconds / 31104000);

    if (tahun > 0) str += tahun + " years ";
    if (bulanShow > 0) str += bulanShow + " months ";
    if (hariShow > 0) str += hariShow + " days ";
    if (jamShow > 0) str += jamShow + " hours ";
    if (menitShow > 0) str += menitShow + " minutes ";
    if (detik > 0) str += detik + " seconds ";

    return str;
  };

  const formatNumberWithSeparator = (numberValue: number) => {
    if (numberValue == null || numberValue == undefined) return "0";
    return numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  //#endregion

  return (
    <div className="relative flex flex-col justify-start font-sans bg-[url(/images/home_main_bg.webp),_url(/images/home_header_bg.webp)] bg-[contain, contain] bg-position-[center_190px,top] sm:bg-position-[center_250px,top] md:bg-position-[center_250px,top] lg:bg-position-[center_250px,top] bg-size-[130%] lg:bg-auto bg-no-repeat bg-blend-normal ">
      <Header />
      <LogoBanner />
      <div className="my-20">
        <div className="w-[95%] max-w-[1200px] bg-[#222222] border-2 border-gray-500 shadow-2xl m-auto py-4 px-10">
          <div className="text-lg text-center font-bold pb-5">RANKING</div>
          <div className="w-full">
            <select
              className=" rounded-2xl w-full border text-[#ffe488] bg-gray-800 border-gray-400 focus:outline-none focus:border-blue-600 py-2 px-4 text-sm mt-1  "
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value={"level"}>Level</option>
              <option value={"reputation"}>Reputation</option>
              <option value={"timeonline"}>Time Online</option>
              {/* <option value={"pvpkill"}>PVP Kill</option>
            <option value={"wantedtime"}>Wanted Time</option> */}
            </select>
          </div>
          <div className="flex flex-wrap justify-center">
            <div
              className={`w-full 
                 max-w-[900px] m-auto
               p-3`}
            >
              <div className="overflow-hidden">
                {/* <div className="flex justify-center py-3">
                  <div className="rounded bg-black text-white text-xl px-2">
                    {item.name}
                  </div>
                </div> */}
                <table className="w-full table-auto border-gray-600">
                  <tr>
                    <th className="text-black font-bold p-1">No</th>
                    <th className="text-black font-bold p-1">Nickname</th>
                    <th className="text-black font-bold p-1">Gender</th>
                    {type == "level" && (
                      <th className="text-black font-bold p-1">Level</th>
                    )}
                    {type == "reputation" && (
                      <th className="text-black font-bold p-1">Reputation</th>
                    )}
                    {type == "timeonline" && (
                      <th className="text-black font-bold p-1">Time Online</th>
                    )}
                    {type == "pvpkill" && (
                      <th className="text-black font-bold p-1">PVP Kill</th>
                    )}
                    {type == "wantedtime" && (
                      <th className="text-black font-bold p-1">Wanted Time</th>
                    )}
                  </tr>
                  {data.map((row2: any, idx2: number) => (
                    <tr
                      key={idx2}
                      className={` ${
                        idx2 % 2 == 0 ? "even" : ""
                      }`}
                    >
                      <td className="no">{idx2 + 1}</td>
                      <td className="text-black p-1">{row2.name}</td>
                      <td className="text-black p-1">
                        {row2.gender == 0 ? "Male" : "Female"}
                      </td>
                      {type == "level" && (
                        <td className="text-black p-1">{row2.level}</td>
                      )}
                      {type == "reputation" && (
                        <td className="text-black p-1">
                          {formatNumberWithSeparator(row2.reputation)}
                        </td>
                      )}
                      {type == "timeonline" && (
                        <td className="text-black p-1">
                          {convertOnlineTime(row2.time_used)}
                        </td>
                      )}
                      {type == "pvpkill" && (
                        <td className="text-black p-1">{row2.level}</td>
                      )}
                      {type == "wantedtime" && (
                        <td className="text-black p-1">
                          {convertOnlineTime(row2.time_used)}
                        </td>
                      )}
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
