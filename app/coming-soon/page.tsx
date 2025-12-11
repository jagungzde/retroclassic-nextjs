
import Header from "../components/header";
import LogoBanner from "../components/logoBanner";

import Footer from "../components/footer";

export default function ComingSoon(){

    return (
        <div className="relative flex flex-col justify-start font-sans bg-[url(/images/home_main_bg.webp),_url(/images/home_header_bg.webp)] bg-[contain, contain] bg-position-[center_190px,top] sm:bg-position-[center_250px,top] md:bg-position-[center_250px,top] lg:bg-position-[center_250px,top] bg-size-[130%] lg:bg-auto bg-no-repeat bg-blend-normal ">
            <Header />
            <LogoBanner />
            <div className="mb-20">
                <div className="w-full max-w-[600px] bg-[#222222] border-2 border-gray-500 shadow-2xl m-auto py-5 px-10">
                    <div className="text-white text-2xl text-center">COMING SOON</div>
                </div>
            </div>
            <Footer />
        </div>
    )
}