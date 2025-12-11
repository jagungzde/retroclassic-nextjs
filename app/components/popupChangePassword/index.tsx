"use client"

import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import auth from "@/app/services/auth.service";

export default function PopupChangePassword(props:any){
    const router = useRouter();

  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");
  //   const [tokenCaptcha, setTokenCaptcha] = useState();
  //   const [widgetId, setWidgetId] = useState();
  //   const dispatch = useAppDispatch();
  const loginInfo = useAppSelector((state) => state.auth.loginInfo);
  const [message, setMessage] = useState({
    status: "success",
    message: ""
  });

  const doSubmit = () => {
    const params = {
      action: "change_password",
      password,
      newpassword,
      pin,
    };
    auth
      .changePassword(params)
      .then((res) => {
        if (res.flag == 1) {
            setMessage({status: "success", "message":"Change Password Success."});
          setPassword("");
          setNewpassword("");
          setConfirmPassword("");
        } else {
            setMessage({status: "error", "message":"Change Password Failed. "+ res.data});
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

    useEffect(() => {
        if (loginInfo.account == "") router.push("/");
      }, []);


    return (
        <>
    <div
      id="section-popup-register"
      className="fixed bg-gray-900/50 min-h-screen w-full z-100"
      onClick={props.onClose}
    >
      <div className="w-full max-w-[500px] bg-[#222222] border border-gray-500 mt-30 shadow-2xl m-auto py-4 px-10" onClick={(e) => e.stopPropagation()}>
        {message.message != "" && <div className={`${message.status == "success" ? "message-success" : "message-error"}`}>
          {message.message}
        </div>}
        <div className="text-lg font-bold pb-5 text-center">
          Change Password
        </div>
        <div className="field">
          <div className="label">Current Password</div>
          <div className="input">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter Current Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {password.length < 6 && (
            <div className="error">Current Password minimum 6 characters</div>
          )}
        </div>
        <div className="field">
          <div className="label">New Password</div>
          <div className="input">
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              value={newpassword}
              placeholder="Enter New Password"
              onChange={(e) => setNewpassword(e.target.value)}
            />
          </div>
          {newpassword.length < 6 && (
            <div className="error">New Password minimum 6 characters</div>
          )}
        </div>
        <div className="field">
          <div className="label">Confirm Password</div>
          <div className="input">
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              value={confirmPassword}
              placeholder="Enter Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {(newpassword != confirmPassword) && (
            <div className="error">New Password and Confirm Password must be same!</div>
          )}
        </div>
        <div className="field">
          <div className="label">PIN</div>
          <div className="input">
            <input
              type="pin"
              name="pin"
              id="pin"
              value={pin}
              placeholder="Enter PIN"
              onChange={(e) => setPin(e.target.value)}
            />
          </div>
          {pin.length < 6 && (
            <div className="error">PIN minimum 6 character</div>
          )}
        </div>
        <div className="field-button">
            <button type="button" onClick={props.onClose}>Cancel</button>
            <button type="button" 
            disabled={
                      password.length < 6 ||
                      newpassword.length < 6 ||
                      newpassword != confirmPassword
                    } 
            onClick={doSubmit}>Submit</button>
        </div> 
      </div>
    </div>
    </>
    )
}