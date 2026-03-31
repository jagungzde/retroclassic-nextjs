"use client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import LinkSuccess from "@/app/components/linkSuccess";
import { Suspense } from "react";
import Loading from "@/app/components/loading";
import ServerStatus from "@/app/components/serverStatus";

export default function Link() {
  return (
    <>
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
                <div className="w-full max-w-[1420px] m-auto bg-gray-800 rounded-2xl shadow-2xl mb-12 mt-6 relative">
                  <div className="text-center text-3xl text-gray-200 pb-2.5">
                    Link Account
                  </div>
                  <div className="w-[250px] bg-white h-[2px] m-auto"></div>
                  <div className="p-[20px]">
                    <Suspense fallback={<Loading />}>
                      <LinkSuccess />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
