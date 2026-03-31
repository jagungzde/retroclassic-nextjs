"use client";
import { useSearchParams } from "next/navigation";

import LogoBanner from "@/app/components/logoBanner";
import { useEffect, useState } from "react";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import donationServices from "@/app/services/donation.service";
import tokenServices from "@/app/services/token.service";
import logoBca from "@/public/images/donation/logo-bca.png";
import logoQris from "@/public/images/donation/logo-qris.png";
import logoCC from "@/public/images/donation/logo-cc.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/features/auth/authSlice";
import coin1 from "@/public/images/donation/coin1.png";
import coin2 from "@/public/images/donation/coin2.png";
import coin3 from "@/public/images/donation/coin3.png";
import coin4 from "@/public/images/donation/coin4.png";
import coin5 from "@/public/images/donation/coin5.png";
import coin6 from "@/public/images/donation/coin6.png";
import coin7 from "@/public/images/donation/coin7.png";
import coin8 from "@/public/images/donation/coin8.png";
import DonationConfirmationModal from "../components/donationConfirmationModal";
import QRCode from "react-qr-code";

export default function Download() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [methodList, setMethodList] = useState([]);
    const [currentMethod, setCurrentMethod] = useState("");
    const [reffCode, setReffCode] = useState("");
    const [amountList, setAmountList] = useState([]);
    const [isValidReff, setIsValidReff] = useState(true);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [itemAmount, setItemAmount] = useState({
      price: "",
      bonus: 0,
    });
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [currTab, setCurrTab] = useState(0);
    const [historyList, setHistoryList] = useState([]);
  
    const getListMethod = () => {
      const params = {
        action: "list",
      };
      donationServices
        .donation(params)
        .then((res) => {
          if (res.flag == 1) {
            setMethodList(res.data);
          } else if (res.flag == -99) {
            dispatch(logout());
            //   router.push("/");
          } else {
            alert(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    const getAmountList = (cmd: string, reff: string) => {
      const params = {
        action: cmd,
        reff: reff,
      };
      donationServices
        .donation(params)
        .then((res) => {
          if (res.flag == 1) {
            setAmountList(res.data);
            setIsValidReff(res.isValidReff);
          } else if (res.flag == -99) {
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
  
    const getHistory = () => {
      donationServices
        .donation({ action: "history" })
        .then((res) => {
          if (res.flag == 1) {
            setHistoryList(res.data);
          } else if (res.flag == -99) {
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
  
    const selectMethod = (type: string) => {
      const cmd = type.toLowerCase() + "_list";
      getAmountList(cmd, reffCode);
  
      setCurrentAmount(0);
      setCurrentMethod(type);
    };
  
    const changeReffCode = () => {
      const cmd = currentMethod.toLowerCase() + "_list";
      getAmountList(cmd, reffCode);
    };
  
    const formatNumberWithSeparator = (numberValue: number) => {
      return numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
  
    const formatTimestamp = (timestamp: number) => {
      const date = new Date(Number(timestamp) * 1000);
  
      const month = date.getMonth() + 1; // Months are 0-based
      const day = date.getDate();
      const year = date.getFullYear();
  
      const hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
  
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };
  
    const doPurchase = () => {
      setOpenConfirmation(true);
    };
  
    const onConfirmClose = () => {
      setOpenConfirmation(false);
    };
  
    const renderNote = (note: string, method: string, status: number) => {
      if (method == "QRIS") {
        // return <Link href={note} target="_blank" />;
        if (status == 0) {
          return (
            <QRCode
              size={256}
              style={{
                height: "auto",
                maxWidth: "120px",
                width: "100%",
                margin: "auto",
              }}
              value={note}
              viewBox={`0 0 256 256`}
            />
          );
        } else return "";
      } else if (method == "CC") {
        if (status == 0) {
          return (
            <a href={note} target="_blank">
              {note}
            </a>
          );
        } else return "";
      } else {
        return note;
      }
    };
  
    const renderStatus = (status: number) => {
      if (status == -2) return "Failed";
      else if (status == -1) return "Failed";
      else if (status == 0) return "Waiting for payment";
      else if (status == 1) return "Success";
      else if (status == 2) return "Manual Confirm";
      else return "";
    };
  
    useEffect(() => {
      if (tokenServices.getToken() == null) router.push("/");
      else {
        getListMethod();
      }
    }, []);

  return (
    <div className="relative flex flex-col justify-start font-sans bg-[url(/images/home_main_bg.webp),_url(/images/home_header_bg.webp)] bg-[contain, contain] bg-position-[center_190px,top] sm:bg-position-[center_250px,top] md:bg-position-[center_250px,top] lg:bg-position-[center_250px,top] bg-size-[130%] lg:bg-auto bg-no-repeat bg-blend-normal ">
      <Header />
      <LogoBanner />
      <div className="my-20">
        <div className="w-[95%] max-w-[1200px] bg-[#222222] border-2 border-gray-500 shadow-2xl m-auto py-4 px-10">
          <div className="w-full m-auto mt-6 flex items-center justify-center gap-4 mb-4">
            <div className="">
              <button
                type="button"
                className={`py-2 px-12 border-0  rounded  font-semibold ${
                  currTab == 0
                    ? "text-black bg-[#ffe488]"
                    : " bg-gray-200 text-black"
                }`}
                onClick={() => setCurrTab(0)}
              >
                Payment
              </button>
            </div>
            <div className="">
              <button
                type="button"
                className={`py-2 px-12 border-0  rounded  font-semibold ${
                  currTab == 1
                    ? "text-black bg-[#ffe488]"
                    : " bg-gray-200 text-black"
                }`}
                onClick={() => {
                  setCurrTab(1);
                  getHistory();
                }}
              >
                History
              </button>
            </div>
          </div>
          {currTab == 0 && (
            <div className="max-w-[920px] w-full flex flex-col pb-[50px] m-auto ">
              <div className="bg-[#E6E6E6] text-black rounded-lg bebas-neue-regular text-2xl m-auto px-10 py-1 drop-shadow-lg">
                CHOOSE PAYMENT METHOD
              </div>
              <div className="flex items-center justify-center gap-4 py-3">
                {methodList.map((item: any, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-center text-center gap-2"
                    onClick={() => selectMethod(item.type)}
                  >
                    <div
                      className={`rounded bg-[#D9D9D9] w-[140px] h-[140px] text-center flex items-center ${
                        currentMethod == item.type
                          ? "border-4 border-[#ffe488]"
                          : ""
                      }`}
                    >
                      {item.type == "BCA" && (
                        <Image
                          src={logoBca}
                          alt="bca"
                          className="w-[90%] m-auto"
                        />
                      )}
                      {item.type == "QRIS" && (
                        <Image
                          src={logoQris}
                          alt="qris"
                          className="w-[90%] m-auto"
                        />
                      )}
                      {item.type == "CC" && (
                        <Image
                          src={logoCC}
                          alt="cc"
                          className="w-[90%] m-auto"
                        />
                      )}
                    </div>
                    <div className="text-white text-base">{item.type}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <div className="text-white">Use Refferal Code: </div>
                <div className="ml-2">
                  <input
                    type="text"
                    className="rounded border-0 bg-[#d9d9d9] py-1 text-base px-4 text-black font-bold drop-shadow-xl"
                    value={reffCode}
                    onChange={(e) => setReffCode(e.target.value)}
                    onBlur={() => changeReffCode()}
                  />
                </div>
              </div>
              {!isValidReff && (
                <div className="text-center text-base mt-2 text-red-600">
                  Invalid Refferal Code
                </div>
              )}
              {amountList.length > 0 && (
                <div>
                  <div className="text-center text-2xl text-gray-200 pb-2.5 mt-8">
                    Choose Amount
                  </div>
                  <div className="w-[250px] bg-gray-200 h-0.5 m-auto"></div>
                </div>
              )}
              <div className="mt-4 flex items-center justify-center flex-row flex-wrap">
                {amountList.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 flex flex-col justify-center items-center text-center gap-1 mb-4"
                    onClick={() => {
                      setCurrentAmount(item.nominal);
                      setItemAmount(item);
                    }}
                  >
                    <div
                      className={`rounded  w-[140px] h-[140px] text-center flex flex-col items-center justfiy-center drop-shadow-xl ${
                        currentAmount == item.nominal
                          ? "border-4 border-[#ffe488] bg-amber-200"
                          : "bg-[#D9D9D9]"
                      }`}
                    >
                      {item.nominal < 150000 && (
                        <Image
                          src={coin1}
                          alt="coin1"
                          className="object-contain m-auto w-[40%]"
                        />
                      )}
                      {item.nominal >= 150000 && item.nominal < 300000 && (
                        <Image
                          src={coin2}
                          alt="coin2"
                          className="object-contain m-auto w-[60%]"
                        />
                      )}
                      {item.nominal >= 300000 && item.nominal < 450000 && (
                        <Image
                          src={coin3}
                          alt="coin3"
                          className="object-contain m-auto w-[60%]"
                        />
                      )}
                      {item.nominal >= 450000 && item.nominal < 1500000 && (
                        <Image
                          src={coin4}
                          alt="coin4"
                          className="object-contain m-auto w-[60%]"
                        />
                      )}
                      {item.nominal >= 1500000 && item.nominal < 2500000 && (
                        <Image
                          src={coin5}
                          alt="coin5"
                          className="object-contain m-auto w-[60%]"
                        />
                      )}
                      {item.nominal >= 2500000 && item.nominal < 4000000 && (
                        <Image
                          src={coin6}
                          alt="coin6"
                          className="object-contain m-auto w-[60%]"
                        />
                      )}
                      {item.nominal >= 4000000 && item.nominal < 5000000 && (
                        <Image
                          src={coin7}
                          alt="coin7"
                          className="object-contain m-auto w-[60%]"
                        />
                      )}
                      {item.nominal >= 5000000 && (
                        <Image
                          src={coin8}
                          alt="coin8"
                          className="object-contain m-auto w-[70%]"
                        />
                      )}
                      <div
                        className={`text-black text-sm ${
                          item.bonus > 0 ? "mb-1" : "mb-2.5"
                        } font-bold`}
                      >
                        {formatNumberWithSeparator(item.nominal)}
                      </div>
                      {item.bonus > 0 && (
                        <div className="text-black text-xs mb-2.5 font-bold">
                          Bonus: {formatNumberWithSeparator(item.bonus)}
                        </div>
                      )}
                    </div>
                    <div className="text-gray-200 text-base font-semibold">
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>
              <div className="field-button" style={{ justifyContent:"center" }}>
                <button
                  type="button"
                  disabled={currentAmount == 0}
                  onClick={doPurchase}
                >
                  PURCHASE NOW
                </button>
              </div>
            </div>
          )}
          {currTab == 1 && (
            <div className="max-w-[1220px] w-full pb-[50px] m-auto">
              <div className="bebas-neue-regular text-center text-3xl text-[#3A1343] pb-[20px] pt-[20px]">
                History Payment
              </div>
              <div className="py-[20px] flex justify-center">
                <button
                  type="button"
                  className="rounded py-2 px-12 bg-green-400 text-gray-800 font-semibold"
                  onClick={getHistory}
                >
                  Refresh
                </button>
              </div>
              <table className="w-full">
                <thead className="border-b border-gray-400 text-black">
                  <tr>
                    <th className="text-left text-sm font-semibold w-[100px] py-[12px] px-[10px]">
                      Id
                    </th>
                    <th className="text-left text-sm font-semibold w-[120px] py-[12px] px-[10px]">
                      Date
                    </th>
                    <th className="text-left text-sm font-semibold w-[100px] py-[12px] px-[10px]">
                      Method
                    </th>
                    <th className="text-left text-sm font-semibold w-[100px] py-[12px] px-[10px]">
                      Reff Code
                    </th>
                    <th className="text-left text-sm font-semibold w-[100px] py-[12px] px-[10px]">
                      Nominal
                    </th>
                    <th className="text-left text-sm font-semibold w-[100px] py-[12px] px-[10px]">
                      Bonus
                    </th>
                    <th className="text-left text-sm font-semibold w-[150px] py-[12px] px-[10px]">
                      Total
                    </th>
                    <th className="text-left text-sm font-semibold w-[200px] py-[12px] px-[10px]">
                      Status
                    </th>
                    <th className="text-left text-sm font-semibold py-[12px] px-[10px]">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historyList.map((item: any, idx: number) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-300 hover:bg-gray-700 hover:text-gray-200 text-black"
                    >
                      <td className="text-left text-sm font-light px-[10px] py-[12px]">
                        {item.id}
                      </td>
                      <td className="text-left text-sm font-light px-[10px] py-[12px]">
                        {formatTimestamp(item.epoch)}
                      </td>
                      <td className="text-left text-sm font-light px-[10px] py-[12px]">
                        {item.method}
                      </td>
                      <td className="text-left text-sm font-light px-[10px] py-[12px]">
                        {item.reff}
                      </td>
                      <td className="text-left text-sm font-light px-[10px] py-[12px]">
                        {formatNumberWithSeparator(item.nominal)}
                      </td>
                      <td className="text-left text-sm font-light px-[10px] py-[12px]">
                        {formatNumberWithSeparator(item.bonus)}
                      </td>
                      <td className="text-left text-sm font-light px-[10px] py-[12px]">
                        {formatNumberWithSeparator(item.total)}
                      </td>
                      <td className="text-left text-sm font-light px-[10px] py-[12px]">
                        {renderStatus(item.status)}
                      </td>
                      <td className="text-left text-sm font-light px-[10px] py-[12px]">
                        {renderNote(item.note, item.method, item.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
      {openConfirmation && (
          <DonationConfirmationModal
            currentMethod={currentMethod}
            nominal={currentAmount}
            reff={reffCode}
            price={itemAmount?.price}
            bonus={itemAmount?.bonus}
            close={onConfirmClose}
          />
        )}
    </div>
  );
}
