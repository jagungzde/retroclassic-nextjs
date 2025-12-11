"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import auth from "@/app/services/auth.service";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { setToken, setLoginInfo } from "@/lib/features/auth/authSlice";
import tokenServices from "@/app/services/token.service";

export default function PopupLogin({onClose}) {
    const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tokenCaptcha, setTokenCaptcha] = useState("0");
  const [widgetId, setWidgetId] = useState(null);
  const [message, setMessage] = useState({
    status: "success",
    message: ""
  });
  const dispatch = useAppDispatch();

  const getInfo = () => {
    const params = {
      action: "account",
    };
    auth
      .getInfo(params)
      .then((res) => {
        if (res.flag == 1) {
          dispatch(setLoginInfo(res.data));
          onClose('');
        } else if (res.flag == -99) {
          onClose('');
          dispatch(logout());
          router.push("/");
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const doSubmit = () => {
    let params = {
      account: username,
      password,
      cfkey: tokenCaptcha == undefined ? "" : tokenCaptcha,
    };
    auth.login(params)
      .then((res) => {
        if (res.flag == 1) {
          //   setMessage({status: "success", "message":"Register Success. Please check email for activation link."});
          dispatch(setToken(res.data));
          tokenServices.destroyChar();
          // window.turnstile.remove(widgetId);
          getInfo();
        } else {
          setMessage({status: "error", "message":"Sign In Failed. "+ res.data});
          // window.turnstile.remove(widgetId);
          // initializeCaptcha();
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
          setTokenCaptcha(token);
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
        <div className="text-lg font-bold pb-5">
          Sign In to Your Perfect World Retro Classic Account
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
          <div className="text-center" id="captcha-container"></div>
        </div>
        <div className="mb-4 text-white hover:text-[#ffe488] hover:underline hover:cursor-pointer" onClick={() => onClose('forgot')}>
          Forgot Password?
        </div>
        <div className="field-button">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="button" 
            disabled={
                      username.length < 4 ||
                      password.length < 6
                    } 
            onClick={doSubmit}>Sign In</button>
        </div> 
      </div>
    </div>
    </>
  );
}
