"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import auth from "@/app/services/auth.service";

export default function PopupManagement({onClose}) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("0");
  const [widgetId, setWidgetId] = useState(null);
  const [message, setMessage] = useState({
    status: "success",
    message: ""
  });

  const validateEmail = (emailValue) => {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let result = re.test(emailValue);
    if (result == true) {
      if (email.indexOf("@gmail") == -1 && email.indexOf("@yahoo") == -1) {
        return false;
      } else {
        return true;
      }
    } else {
      return result;
    }
  };

  const doForgotPin = () => {
    let params = {
      email,
      cfkey: token,
    };
    auth.forgotPin(params)
      .then((res) => {
        if (res.flag == 1) {
            setMessage({status: "success", "message":"Forgot PIN Success."});
          window.turnstile.remove(widgetId);
          //   router.push("/");
        } else {
            setMessage({status: "error", "message":"Forgot PIN Failed. "+ res.data});
          window.turnstile.remove(widgetId);
          initializeCaptcha();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initializeCaptcha = () => {
    if (window && window?.turnstile) {
      const id = window.turnstile.render("#captcha-container", {
        sitekey: "0x4AAAAAAB1gNnP3g_ZkJgc8",
        theme: "light",
        callback: function (token) {
          // console.log("token", token);
          setToken(token);
        },
      });
      setWidgetId(id);
      // console.log("id", id);
    }
  };

  useEffect(() => {
    if (loginInfo.account == "") router.push("/");

    if (window) {
      window.onloadTurnstileCallback = initializeCaptcha;
    }

    if (widgetId == undefined) {
      initializeCaptcha();
    }

    return () => {
      window.onloadTurnstileCallback = null;
      if (widgetId != undefined) window.turnstile.remove(widgetId);
    };
  }, []);

  return (
    <>
    <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
        defer
      />
    <div
      id="section-popup-register"
      className="fixed bg-gray-900/50 min-h-screen w-full z-100"
      onClick={onClose}
    >
      <div className="w-full max-w-[500px] bg-[#222222] mt-30 shadow-2xl m-auto py-4 px-10" onClick={(e) => e.stopPropagation()}>
        {message.message != "" && <div className={`${message.status == "success" ? "message-success" : "message-error"}`}>
          {message.message}
        </div>}
        <div className="text-lg font-bold pb-5 text-center">
            MANAGEMENT
        </div>
        <div className="field">
          <div className="label">Email</div>
          <div className="input">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {!validateEmail(email) && (
            <div className="error">Please enter a valid email address</div>
          )}
        </div>
        <div className="field">
          <div className="text-center" id="captcha-container"></div>
        </div>
        <div className="field-button">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="button" 
            disabled={
                      username.length < 4 ||
                      !validateEmail(email) ||
                      pin.length < 6
                    } 
            onClick={doForgotPin}>Forgot PIN</button>
        </div> 
      </div>
    </div>
    </>
  );
}
