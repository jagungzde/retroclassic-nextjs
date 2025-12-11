"use client"
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { useRouter } from "next/navigation";

export default function LogoBanner() {
  const router = useRouter();

  return (
    <section className="w-full my-10 lg:mt-20 lg:lb-10">
        <Image src={Logo} alt="logo" className="w-[70%] sm:w-[400px] md:w-[400px] lg:w-[400px] m-auto hover:cursor-pointer" onClick={() => router.push("/")} />
    </section>
  );
}
