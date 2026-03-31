"use client";
import { useState, useEffect } from "react";
import Script from "next/script";
import { useAppDispatch } from "@/lib/hooks";
import tokenServices from "@/app/services/token.service";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import headerBanner from "@/public/images/donation/confirm-header.png";
import logo from "@/public/images/logo.png";
import coin1 from "@/public/images/donation/coin1.png";
import coin2 from "@/public/images/donation/coin2.png";
import coin3 from "@/public/images/donation/coin3.png";
import coin4 from "@/public/images/donation/coin4.png";
import coin5 from "@/public/images/donation/coin5.png";
import coin6 from "@/public/images/donation/coin6.png";
import coin7 from "@/public/images/donation/coin7.png";
import coin8 from "@/public/images/donation/coin8.png";
import donationServices from "@/app/services/donation.service";
import { logout } from "@/lib/features/auth/authSlice";
import QRCode from "react-qr-code";

export default function DonationConfirmationModal(props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [note, setNote] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [total, setTotal] = useState(0);
  const [tokenCaptcha, setTokenCaptcha] = useState();
  const [widgetId, setWidgetId] = useState();
  const [processing, setProcessing] = useState(false);

  const initializeCaptcha = () => {
    if (window && window?.turnstile) {
      const id = window.turnstile.render("#captcha-container", {
        sitekey: "0x4AAAAAAB1gNnP3g_ZkJgc8",
        theme: "light",
        callback: function (token) {
          setTokenCaptcha(token);
        },
      });
      setWidgetId(id);
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

  const closeModal = () => {
    props.close();
  };

  const renderNote = () => {
    if (props.currentMethod == "QRIS")
      return (
        // <a href={data.note} target="_blank">
        //   {data.note}
        // </a>
        <QRCode
          size={256}
          style={{
            height: "auto",
            maxWidth: "250px",
            width: "100%",
            margin: "auto",
          }}
          value={note}
          viewBox={`0 0 256 256`}
        />
      );
    else if (props.currentMethod == "CC") {
      return (
        <>
          <a href={note} target="_blank">
            Payment Link
          </a>
        </>
      );
    } else {
      return <>{note}</>;
    }
  };

  const doSubmit = () => {
    if (processing) return false;
    setProcessing(true);
    const params = {
      action: props.currentMethod.toLowerCase() + "_submit",
      nominal: props.nominal,
      reff: props.reff,
      cfkey: tokenCaptcha == undefined ? "" : tokenCaptcha,
    };
    donationServices
      .donation(params)
      .then((res) => {
        if (res.flag == 1) {
          setNote(res.data.note);
          setIsPaid(true);
          setTotal(res.data.total);
          if (props.currentMethod == "CC") window.open(res.data.note, "_blank");
        } else if (res.flag == -99) {
          dispatch(logout());
          router.push("/");
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        window.turnstile.remove(widgetId);
        initializeCaptcha();
        setProcessing(false);
      });
  };

  const formatNumberWithSeparator = (numberValue) => {
    return numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
        async
        defer
      />
      <div className="fixed top-0 w-full h-screen bg-[rgba(0,0,0,.6)] z-50 overflow-auto">
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[95%] max-w-[500px] bg-gray-800 border border-gray-400 rounded-[8px]  shadow overflow-hidden pt-8">
          <div className="relative">
            <Image
              src={logo}
              alt="logo"
              className=" max-w-[150px] m-auto"
            />
          </div>
          <div className="text-gray-200 text-center text-xl my-3">
            Transaction
          </div>
          <div className="w-[80%] h-[130px] max-w-[300px] rounded bg-gray-900 flex items-center justify-center flex-col m-auto border-2 border-[#FFBB00]">
            {props.nominal < 150000 && (
              <Image
                src={coin1}
                alt="coin1"
                className="object-contain m-auto w-[20%]"
              />
            )}
            {props.nominal >= 150000 && props.nominal < 300000 && (
              <Image
                src={coin2}
                alt="coin2"
                className="object-contain m-auto w-[30%]"
              />
            )}
            {props.nominal >= 300000 && props.nominal < 450000 && (
              <Image
                src={coin3}
                alt="coin3"
                className="object-contain m-auto w-[30%]"
              />
            )}
            {props.nominal >= 450000 && props.nominal < 1500000 && (
              <Image
                src={coin4}
                alt="coin4"
                className="object-contain m-auto w-[30%]"
              />
            )}
            {props.nominal >= 1500000 && props.nominal < 2500000 && (
              <Image
                src={coin5}
                alt="coin5"
                className="object-contain m-auto w-[30%]"
              />
            )}
            {props.nominal >= 2500000 && props.nominal < 4000000 && (
              <Image
                src={coin6}
                alt="coin6"
                className="object-contain m-auto w-[30%]"
              />
            )}
            {props.nominal >= 4000000 && props.nominal < 5000000 && (
              <Image
                src={coin7}
                alt="coin7"
                className="object-contain m-auto w-[30%]"
              />
            )}
            {props.nominal >= 5000000 && (
              <Image
                src={coin8}
                alt="coin8"
                className="object-contain m-auto w-[30%]"
              />
            )}
            <div
              className={`bg-[#ffe488] py-1 px-2 text-black text-sm ${
                props.bonus > 0 ? "mb-1" : "mb-2.5"
              } font-bold`}
            >
              {formatNumberWithSeparator(props.nominal)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4 items-center">
            <div className="text-right text-gray-200 text-sm">Method</div>
            <div className="text-left text-[#ffe488] font-semibold">
              {props.currentMethod}
            </div>
            <div className="text-right text-gray-200 text-sm">Sub Total</div>
            <div className="text-left text-[#ffe488] font-semibold">
              {props.price}
            </div>
            <div className="text-right text-gray-200 text-sm">
              Refferal Code
            </div>
            <div className="text-left text-[#ffe488] font-semibold">
              {props.reff}
            </div>
            <div className="text-right text-gray-200 text-sm">Bonus</div>
            <div className="text-left text-[#ffe488] font-semibold">
              {formatNumberWithSeparator(props.bonus)}
            </div>
            <div className="text-right text-gray-200 text-2xl">Total</div>
            <div className="text-left text-[#ffe488] font-semibold text-2xl">
              {isPaid ? formatNumberWithSeparator(total) : props.price}
            </div>
          </div>
          
          {note != "" && (
            <div className="m-auto mt-6 w-[90%] rounded border border-gray-400 flex items-center justify-center min-h-20 text-[#ffe488] ">
              {renderNote()}
            </div>
          )}
          <div className="mb-4 mt-4 text-center" id="captcha-container"></div>
          <div className="field-button px-10 mb-8 gap-4" style={{justifyContent:"center"}}>
            <button
              type="button"
              onClick={closeModal}
            >
              CLOSE
            </button>
            {note == "" && (
              <button
                type="button"
                onClick={doSubmit}
                disabled={processing}
              >
                ORDER NOW
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
