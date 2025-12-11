"use client"
import home from "@/app/services/home.service"
import { useEffect, useState } from "react";

export default function ServerStatus() {

  const [server, setServer] = useState({
    online: 0,
    status: "offline",
  });
  const [preregist, setPreregist] = useState(0);

  const getInfo = () => {
    home
      .home({})
      .then((res) => {
        setServer(res.server); 
        setPreregist(res.t_preregist);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getInfo();
  }, [])

  return (
    <div className="flex flex-col md:flex-row gap-2 justify-center items-center ">
        <div className="border-2 rounded border-gray-600 w-[300px] sm:w-[400px] py-3 flex justify-center text-lg bg-gray-900 items-center">Online Player: <span className="ml-4 text-green-600">{server.online}</span></div>
        {/* <div className="border-2 rounded border-gray-600 w-[300px] sm:w-[400px] py-3 flex justify-center text-lg bg-gray-900  items-center ">Server Status: {server.status == "online" && <div className="ml-4 rounded-full bg-green-700 border border-green-400 w-5 h-5"></div>} {server.status == "offline" && <div className="ml-4 rounded-full bg-red-700 border border-red-400 w-5 h-5"></div>}</div> */}
        <div className="border-2 rounded border-gray-600 w-[300px] sm:w-[400px] py-3 flex justify-center text-lg bg-gray-900  items-center ">Pre-register: <span className="ml-4 text-green-600">{preregist}</span></div>
        <div className="border-2 rounded border-gray-600 w-[300px] sm:w-[400px] py-3 flex justify-center text-lg bg-gray-900 items-center">Launch: <span className="ml-4 text-green-600">08 December 2025</span></div>
      </div>
  );
}
