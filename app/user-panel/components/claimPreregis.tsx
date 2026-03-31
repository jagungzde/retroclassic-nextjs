"use client";
import { useEffect, useState } from "react";
import eventService from "@/app/services/event.service";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import { logout } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";

export default function ClaimPreregis(props: any) {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [rewardList, setRewardList] = useState([]);

  //#region claim preregist
  useEffect(() => {
    listPreregis();
  }, []);

  const listPreregis = () => {

    const params = {
      action: "list",
    };
    eventService.preregis(params)
      .then((res) => {
        if (res.flag == 1) {
          setRewardList(res.data);
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitPreregis = (id: number) => {
    if (props.charId == "0") {
      alert("Please choose character first");
      return;
    }

    const params = {
      action: "submit",
      charid: props.charId,
      id: id,
    };
    eventService.preregis(params)
      .then((res) => {
        if (res.flag == 1) {
          alert("Claim Success");
          listPreregis();
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
  //#endregion 

  return (
    <>
      <div className="w-full flex flex-col gap-2 mt-4">
        <div className="text-lg text-center text-white py-4 font-semibold">CLAIM PRE-REGISTER EVENT</div>
        <div className="py-4 flex justify-center items-stretch flex-wrap gap-3 lg:gap-3">
          {rewardList.map((item: any, idx) => (
            <div
              key={idx}
              className={`rounded px-2 py-3 border drop-shadow-xl border-gray-500 bg-gray-800 flex flex-col items-center basis-full lg:basis-1/3`}
            >
              <div className={`text-lg text-amber-500`}>{item.name}</div>
              <div className="grow w-full">
                <table className="border-collapse w-full">
                    {item.rewards.map((itemReward:any, idx2:number) => 
                        <tr key={idx2}>
                            {/* <td className="text-sm text-left! border-0! border-b! border-b-gray-500!"><img
                            src={`https://img.retroclassic.asia/items/${itemReward.id}.jpg`}
                            alt={itemReward.id}
                            className="w-9 h-9 rounded shadow border border-gray-400 bg-white"
                          /></td> */}
                            <td className="text-sm text-left! border-0! border-b! border-b-gray-500!">{itemReward.name}</td>
                            <td className="text-sm text-right! w-[50px]! border-0! border-b! border-b-gray-500!">x {itemReward.qty}</td>
                        </tr>
                    )}
                </table>
              </div>
              <div className={`w-full pt-4`}>
                <button
                  type="button"
                  className={`w-full ${
                    item.isopen == false
                      ? "bg-gray-300 text-gray-800"
                      : item.isclaim == false
                      ? "text-gray-800 bg-amber-500 hover:bg-amber-400 hover:text-black hover:cursor-pointer"
                      : "bg-gray-200 text-gray-500"
                  } rounded-lg px-2 py-1 font-semibold text-sm m-auto `}
                  disabled={item.isopen == false || item.isclaim == true}
                  onClick={() => submitPreregis(item.id)}
                >
                  {item.isopen == false
                    ? "REQUIREMENT NOT MEET"
                    : item.isclaim == false
                    ? "READY CLAIM"
                    : "ALREADY CLAIM"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
