"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/features/auth/authSlice";
import home from "../services/home.service";
import { useRouter, useSearchParams } from "next/navigation";

export default function LinkSuccess() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showText, setShowText] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const sendCode = () => {
    const params = { action: "code", code };
    home
      .discord(params)
      .then((res) => {
        if (res.flag == 1) {
          setShowText(true);
        } else if (res.flag == -99) {
          dispatch(logout());
          router.push("/");
        } else {
          setIsFailed(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    sendCode();
  }, []);

  return (
    <>
      <div className="p-3">
        {showText && (
          <div className="px-2 py-6 border border-amber-500 rounded-[8px] text-center text-gray-200 text-base">
            Link to Discord is success.
          </div>
        )}
        {!showText && !isFailed && (
          <div className="px-2 py-6 border border-amber-500 rounded-[8px] text-center text-gray-200 text-base">
            Loading...
          </div>
        )}
        {isFailed && (
          <div className="px-2 py-6 border border-amber-500 rounded-[8px] text-center text-gray-200 text-base">
            Link to Discord is failed. Please try again.
          </div>
        )}
      </div>
    </>
  );
}
