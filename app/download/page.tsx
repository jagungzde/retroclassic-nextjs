"use client"
import { useSearchParams } from "next/navigation";

import LogoBanner from "@/app/components/logoBanner";
import { useEffect, useState } from "react";
import auth from "@/app/services/auth.service";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import home from "@/app/services/home.service";

export default function Download(){
    const [urlDownload, setUrlDownload] = useState("");

      useEffect(() => {
        home
          .download({})
          .then((res) => {
            if (res.flag == 1) {
              setUrlDownload(res.data);
            } else {
              alert(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }, []);


    return (
        <div className="relative flex flex-col justify-start font-sans bg-[url(/images/home_main_bg.webp),_url(/images/home_header_bg.webp)] bg-[contain, contain] bg-position-[center_190px,top] sm:bg-position-[center_250px,top] md:bg-position-[center_250px,top] lg:bg-position-[center_250px,top] bg-size-[130%] lg:bg-auto bg-no-repeat bg-blend-normal ">
            <Header />
            <LogoBanner />
            <div className="my-20">
                <div className="w-[95%] max-w-[900px] bg-[#222222] border-2 border-gray-500 shadow-2xl m-auto py-4 px-10">
                    <div className="text-lg text-center font-bold pb-5">
                        DOWNLOAD
                    </div>
                    <div className="px-8 text-white flex justify-center">
                        <div
                            className="relative py-4 m-auto opacity-100 z-20 text-black text-center"
                            dangerouslySetInnerHTML={{ __html: urlDownload }}
                        ></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}