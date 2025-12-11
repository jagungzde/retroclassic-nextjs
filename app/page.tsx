"use client"
import Image from "next/image";
import Header from "./components/header";
import LogoBanner from "./components/logoBanner";
import registerText from "@/public/images/register_text.png"
import ServerStatus from "./components/serverStatus";
import Footer from "./components/footer";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div className="relative flex flex-col justify-start font-sans bg-[url(/images/home_main_bg.webp),_url(/images/home_header_bg.webp)] bg-[contain, contain] bg-position-[center_190px,top] sm:bg-position-[center_250px,top] md:bg-position-[center_250px,top] lg:bg-position-[center_600px,top] bg-size-[130%] lg:bg-auto bg-no-repeat bg-blend-normal ">
      <Header />
      <LogoBanner />
      <div className="flex flex-col items-center justify-center mb-[100px] md:mb-[200px]">
        <div className="flex justify-center items-center bg-[url(/images/primary_button_bg.webp)] bg-no-repeat bg-cover bg-center w-[300px] h-[150px] sm:w-[404px] sm:h-[179px] text-white text-3xl font-bold hover:cursor-pointer hover:brightness-120" onClick={() => router.push("/download")}>
          Play NOW!!
        </div>
        <div className="flex justify-center items-center">
          <Image src={registerText} alt="register" className="w-[80%]" />
        </div>
      </div>
      <ServerStatus />
      {/* <section id="desc" className="mt-4">
        <div className="text-[#ffe488] text-center underline text-2xl">Retro Classic - RC</div>
        <div className="m-auto mt-4 max-w-[1100px] text-justify">
          <p>
            Are you tired of pay-to-win MMORPG games? Our private server, Perfect World Mayhem 1.5.5 Elysium
            update, offers the best alternative to the official game. we've spent months trying to optimize 
            the gameplay and fixing all the issues that existed in the official servers, to get a fully 
            immersive and fair experience. 
        </p>
        </div>
        <div className="m-auto mt-4 max-w-[1100px] text-justify">
        <p>
          Our main goal is to make the game accessible and enjoyable to all players. that's why we've made 
          several systems that allow you to craft and acquire valuable items through playing the game, 
          without ever having to spend a penny. we are committed to being one of the top private servers, 
          and we believe that our dedication to creating a fair and engaging environment sets us apart.
        </p>
        </div>
        <div className="m-auto mt-4 max-w-[1100px] text-justify">
        <p>
          The game is entirely free to play. we want to create a community where players are fully committed 
          and invested in the game. on our free to play private server, we want you to create new memories, 
          and have an engaging and fun gaming experience, where you will be able to progress through the 
          game at a guaranteed pace to keep you engaged and motivated.
        </p>
        </div>
        <div className="text-center text-base text-[#ffe488] mt-4">
          Join us now, and discover the thrill of Perfect World Mayhem!
        </div>
      </section> */}
      {/* <section id="news">

      </section> */}
      {/* <section id="ranking">
        <div className="w-full max-w-[1200px] mt-5 mb-5 m-auto bg-black">
          <div className="px-4 pb-4 border border-2 border-gray-700 rounded">
            <div className="text-[#ffe488] text-2xl text-center py-4 border-b border-b-gray-600">Top 10 Player Ranking</div>
            <div className="py-4">
              <table className="w-full border border-gray-600">
                <thead>
                  <tr>
                    <th className="text-[#ffe488] text-center border border-gray-600 bg-gray-900 p-2">Rank</th>
                    <th className="text-[#ffe488] text-center border border-gray-600 bg-gray-900 p-2">Name</th>
                    <th className="text-[#ffe488] text-center border border-gray-600 bg-gray-900 p-2">Class</th>
                    <th className="text-[#ffe488] text-center border border-gray-600 bg-gray-900 p-2">Kills</th>
                    <th className="text-[#ffe488] text-center border border-gray-600 bg-gray-900 p-2">Death</th>
                    <th className="text-[#ffe488] text-center border border-gray-600 bg-gray-900 p-2">Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-[#ffe488] text-center border border-gray-600 p-2">1</td>
                    <td className="text-gray-300 text-center border border-gray-600 p-2">One</td>
                    <td className="text-gray-300 text-center border border-gray-600 p-2">Warrior</td>
                    <td className="text-gray-300 text-center border border-gray-600 p-2">105</td>
                    <td className="text-gray-300 text-center border border-gray-600 p-2">22</td>
                    <td className="text-gray-300 text-center border border-gray-600 p-2">100</td>
                  </tr>
                  <tr>
                    <td className="text-[#ffe488] text-center border border-gray-600 bg-gray-800 p-2">2</td>
                    <td className="text-gray-300 text-center border border-gray-600 bg-gray-800 p-2">One</td>
                    <td className="text-gray-300 text-center border border-gray-600 bg-gray-800 p-2">Warrior</td>
                    <td className="text-gray-300 text-center border border-gray-600 bg-gray-800 p-2">105</td>
                    <td className="text-gray-300 text-center border border-gray-600 bg-gray-800 p-2">22</td>
                    <td className="text-gray-300 text-center border border-gray-600 bg-gray-800 p-2">100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded p-3 text-center">
              <button type="button" className="border border-gray-300 text-white text-sm px-5 py-2 rounded bg-gray-900 hover:bg-gray-700 hover:cursor-pointer">View More</button>
            </div>
          </div>
        </div>
      </section> */}
      <Footer />
    </div>
  );
}
