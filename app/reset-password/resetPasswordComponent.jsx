"use client"
import { useSearchParams } from "next/navigation";

import LogoBanner from "@/app/components/logoBanner";
import { useEffect, useState } from "react";
import auth from "@/app/services/auth.service";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";

export default function ResetPasswordComponent(){
    const searchParams =useSearchParams();
    const key = searchParams.get("key");
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState({
        status: "success",
        message: ""
      });

    const doSubmit = () => {
        let params = {
            key: key,
            newpassword: password,
          };
          auth
            .resetPassword(params)
            .then((res) => {
              if (res.flag == 1) {
                setMessage({status: "success", "message":"Reset Password Success. You will be redirect to Home in view seconds"});
                // router.push("/");
                setPassword("");
                setConfirmPassword("");
                setTimeout(() => {
                    router.push("/");
                }, 4000);
              } else {
                setMessage({status: "error", "message":"Reset Password Failed. " + res.data});
              }
            })
            .catch((err) => {
              console.log(err);
            });
      };

    useEffect(() => {
        if (key == null) router.push("/");
    }, []);

    return (
        <div className="relative flex flex-col justify-start font-sans bg-[url(/images/home_main_bg.webp),_url(/images/home_header_bg.webp)] bg-[contain, contain] bg-position-[center_190px,top] sm:bg-position-[center_250px,top] md:bg-position-[center_250px,top] lg:bg-position-[center_250px,top] bg-size-[130%] lg:bg-auto bg-no-repeat bg-blend-normal ">
            <Header />
            <LogoBanner />
            <div className="mb-20">
                <div className="w-full max-w-[600px] bg-[#222222] border-2 border-gray-500 shadow-2xl m-auto py-4 px-10">
                    {message.message != "" && <div className={`${message.status == "success" ? "message-success" : "message-error"}`}>
                        {message.message}
                    </div>}
                    <div className="text-lg text-center font-bold pb-5">
                        RESET PASSWORD
                    </div>
                    <div className="field">
                        <div className="label">Password</div>
                        <div className="input">
                            <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {password.length < 6 && (
                            <div className="error">Password minimum 6 characters</div>
                        )}
                    </div>
                    <div className="field">
                        <div className="label">Confirm Password</div>
                        <div className="input">
                            <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            value={confirmPassword}
                            placeholder="Enter Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {password != confirmPassword && (
                            <div className="error">Password & Confirm Password must be same!</div>
                        )}
                    </div>
                    <div className="field">
                        <div className="text-center" id="captcha-container"></div>
                    </div>
                    <div className="field-button" style={{ justifyContent:"center" }}>
                        <button type="button" 
                        disabled={password.length < 6 || password != confirmPassword} 
                        onClick={doSubmit}>SUBMIT</button>
                    </div> 
                </div>
            </div>
            <Footer />
        </div>
    )
}