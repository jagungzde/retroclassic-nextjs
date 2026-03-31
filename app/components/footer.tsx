"use client";

import { useRouter } from "next/navigation";
import Logo from "@/public/images/logo.png";
import Image from "next/image";
import IconFacebook from "@/public/images/icon-facebook.png";
import IconDiscord from "@/public/images/icon-discord.png";
import IconInstagram from "@/public/images/icon-instagram.png";

export default function Footer() {
  const router = useRouter();
  

  return (
    <footer className="flex w-full text-gray-100 mt-12 ">
        <div className="w-full max-w-[1200px] py-5 border-t border-gray-700 flex flex-col md:flex-row m-auto justify-center">
            <div className="basis-2/3 flex">
                <div className="basis-2/3">
                    <div className="text-sm font-bold">Perfect World Retro Classic @ 2025</div>
                    <div className="text-sm">Perfect World is a free game and it does not require a monthly fee, the game can be downloaded free from our website, and it can also be shared and installed in computer clubs.
                    <br/><br/>
                    This is test server and it was created to familiarize with the game Perfect World. All right belong to the copyright holder.
                    </div>
                    <div className="flex pt-1">
                        <a href="#" className="text-sm font-bold mr-4">PRIVACY POLICY</a><a href="#" className="text-sm font-bold">Terms Of Service</a> 
                    </div>
                </div>
                <div className="basis-1/3 text-center">
                    <a href="/"><Image src={Logo} alt="logo" className="w-[200px] m-auto" /></a>
                </div>
            </div>
            <div className="basis-1/3 flex justify-end justify-items-end text-right items-center content-center flex-wrap">
                <a href="/" className="basis-1/3 my-1 hover:text-[ffe488] hover:underline">Home</a>
                <a href="/ranking" className="basis-1/3 my-1 hover:text-[ffe488] hover:underline">Ranking</a>
                <a href="/rules" className="basis-1/3 my-1 hover:text-[ffe488] hover:underline">Rules</a>
                <a href="/download" className="basis-1/3 my-1 hover:text-[ffe488] hover:underline">Download</a>
                <a href="/coming-soon" className="basis-1/3 my-1 hover:text-[ffe488] hover:underline">News</a>
                <div className="basis-3/3 mt-6 flex gap-6 justify-end">
                    <a href="https://www.facebook.com/gaming/retroclassicasia" target="_blank"><Image src={IconFacebook} alt="facebook" className="w-6 h-6"></Image></a>
                    <a href="https://discord.gg/retroclassic" target="_blank"><Image src={IconDiscord} alt="discord" className="w-6 h-6"></Image></a>
                    <a href="https://www.instagram.com/retroclassic_asia/" target="_blank"><Image src={IconInstagram} alt="instagram" className="w-6 h-6"></Image></a>
                </div>
            </div>
        </div>
    </footer>
  );
}
