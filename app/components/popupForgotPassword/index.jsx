"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import auth from "@/app/services/auth.service";

export default function PopupForgotPassword({onClose}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
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

  const doSubmit = () => {
    let params = {
      account: username,
      pin,
      email,
      cfkey: token,
    };
    auth.forgotPassword(params)
      .then((res) => {
        if (res.flag == 1) {
          setMessage({status: "success", "message":"Forgot Password Request Success. Reset Password link sent into Your email."});
          setUsername("");
          setEmail("");
          setPin("");
        } else {
          setMessage({status: "error", "message":"Forgot Password Request Failed. "+ res.data});
        //   window.turnstile.remove(widgetId);
        //   initializeCaptcha();
        }
      })
      .catch((err) => {
        setMessage({status: "error", "message": err});
        console.log(err);
      });
  }

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
          Forgot Password
        </div>
        <div className="field">
          <div className="label">Username</div>
          <div className="input">
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {username.length < 4 && (
            <div className="error">Username minimum 4 characters</div>
          )}
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
          <div className="label">PIN</div>
          <div className="input">
            <input
              type="text"
              name="pin"
              id="pin"
              value={pin}
              placeholder="Enter PIN"
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          {(pin.length != 6 || isNaN(Number(pin))) && (
            <div className="error">PIN must 6 digit number</div>
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
            onClick={doSubmit}>Submit</button>
        </div> 
      </div>
    </div>
    </>
  );
}
