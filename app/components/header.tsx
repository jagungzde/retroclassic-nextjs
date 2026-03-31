"use client";
// import Image from "next/image";
// import Logo from "@/public/images/logo.png";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import tokenServices from "@/app/services/token.service";
import authServices from "@/app/services/auth.service";
import { logout, setLoginInfo } from "@/lib/features/auth/authSlice";
import { useEffect, useState } from "react";
import styles from "./header.module.css"
import PopupRegister from "./popupRegister";
import PopupResendVerification from "./popupResendVerification"
import PopupLogin from "./popupLogin"
import PopupForgotPassword from "./popupForgotPassword"

export default function Header() {
  const router = useRouter();
  // const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const loginInfo = useAppSelector((state) => state.auth.loginInfo);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  //START Menu variable
  const [registerIsOpen, setRegisterIsOpen] = useState(false);
  const [resendVerificationIsOpen, setResendVerificationIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [forgotPasswordIsOpen, setForgotPasswordIsOpen] = useState(false);
  //END Menu variable

  //START Menu event
  const openRegister = () => {
    setRegisterIsOpen(true);
  }
  const closeRegister = (next:any) => {
    setRegisterIsOpen(false);
    if(next == 'resend'){
      openResendVerification();
    }
  }
  const openResendVerification = () => {
    setResendVerificationIsOpen(true);
  }
  const closeResendVerification = (next:any) => {
    setResendVerificationIsOpen(false);
  }
  const openLogin = () => {
    setLoginIsOpen(true);
  }
  const closeLogin = (next:any) => {
    setLoginIsOpen(false);
    if(next == 'forgot'){
      openForgotPassword();
    }
  }
  const openForgotPassword = () => {
    setForgotPasswordIsOpen(true);
  }
  const closeForgotPassword = (next:any) => {
    setForgotPasswordIsOpen(false);
  }
  //END Menu event

  const getInfo = () => {
    const params = {
      action: "account",
    };
    authServices
      .getInfo(params)
      .then((res) => {
        if (res.flag == 1) {
          dispatch(setLoginInfo(res.data));
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

  const goToPage = (page: string) => {
    router.push(page);
  };

  const doLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const openMenu = () => {
    setOpenAccountMenu(!openAccountMenu);
  };

  useEffect(() => {
    // if (tokenServices.getToken() == null)
      // tokenServices.saveToken(
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50Ijoic3RyZWFtcyIsImlhdCI6MTc2NTc2NzUzMSwiZXhwIjoxNzY1Nzc4MzMxfQ.oCYOCwIk7c4GPJVMIPlEb7DBawqqRUd0vxOWee0rd8o"
      // );
    if (loginInfo.account == "" && tokenServices.getToken() != null) {
      getInfo();
      // getChar();
    }
  }, []);

  return (
    <header className="flex w-full z-50 ">
      <div className="flex w-full max-w-4xl mx-auto h-20 bg-gradient-to-b from-black from-0% via-black/80 via-70% to-transparent to-100%  justify-between items-center px-2 rounded-b-4xl">
        {/* <div className="hover:cursor-pointer">
          <Image
            src={Logo}
            alt="logo-header"
            height={60}
            onClick={() => goToPage("/")}
          />
        </div> */}
        <div className="hidden lg:flex grow justify-evenly gap-4">
          <div
            className={`${styles.menu} rubik-bold`}
            onClick={() => goToPage("/")}
          >
            HOME
          </div>
          <div
            className={`${styles.menu} rubik-bold `}
            onClick={() => goToPage("/ranking")}
          >
            RANKING
          </div>
          <div
            className={`${styles.menu} rubik-bold `}
            onClick={() => goToPage("/rules")}
          >
            RULES
          </div>
          <div
            className={`${styles.menu} rubik-bold `}
            onClick={() => goToPage("/coming-soon")}
          >
            NEWS
          </div>
          <div
            className={`${styles.menu} rubik-bold `}
            onClick={() => goToPage("/download")}
          >
            DOWNLOAD
          </div>
          {loginInfo.account == "" && <div
            className={`${styles.menu} rubik-bold `}
            onClick={() => openLogin()}
          >
            LOGIN
          </div>}
          {loginInfo.account == "" && <div
            className={`${styles.menu} rubik-bold `}
            onClick={() => openRegister()}
          >
            REGISTER
          </div>}
          {loginInfo.account != "" && <div
            className={`${styles.menu} rubik-bold `}
            onClick={() => goToPage("/donation")}
          >
            DONATION
          </div> }
          {loginInfo.account != "" && <div
            className={`${styles.menu} rubik-bold `}
            onClick={() => goToPage("/user-panel")}
          >
            USER PANEL
          </div>}
          {loginInfo.account != "" && <div
            className={`${styles.menu} rubik-bold `}
            onClick={() => doLogout()}
          >
            LOGOUT
          </div>}
        </div>
        <div
          className="flex lg:hidden pr-4 hover:cursor-pointer"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#fff"
            className="w-8 h-8 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div
          className={`absolute rubik-bold top-[65px] left-0 right-0 drop-shadow-lg z-50 lg:hidden ${
            openMobileMenu ? "inherit" : "hidden"
          }`}
        >
          <div className="bg-gray-900 w-[99%] m-auto relative px-4">
            <div
              className={`${
                // pathname == "/"
                // ? "text-white px-8 py-4 bg-[#32187E] hover:cursor-pointer"
                // : "text-white px-8 py-4 hover:cursor-pointer"
                "text-white px-8 py-4 hover:cursor-pointer border-b border-b-gray-500"
              }`}
              onClick={() => {goToPage("/"); setOpenMobileMenu(false); }}
            >
              Home
            </div>
            <div
              className={`${
                // pathname == "/rank"
                //   ? "text-white px-8 py-4 bg-[#32187E] hover:cursor-pointer"
                //   : "text-white px-8 py-4 hover:cursor-pointer"
                "text-white px-8 py-4 hover:cursor-pointer border-b border-b-gray-500"
              }`}
              onClick={() => {goToPage("/ranking"); setOpenMobileMenu(false);}}
            >
              Ranking
            </div>
            <div
              className={`${
                // pathname == "/rule"
                //   ? "text-white px-8 py-4 bg-[#32187E] hover:cursor-pointer"
                //   : "text-white px-8 py-4 hover:cursor-pointer"
                "text-white px-8 py-4 hover:cursor-pointer border-b border-b-gray-500"
              }`}
              onClick={() => {goToPage("/rules"); setOpenMobileMenu(false);}}
            >
              Rules
            </div>
            <div
              className={`${
                // pathname == "/donation"
                //   ? "text-white px-8 py-4 bg-[#32187E] hover:cursor-pointer"
                //   : "text-white px-8 py-4 hover:cursor-pointer"
                "text-white px-8 py-4 hover:cursor-pointer border-b border-b-gray-500"
              }`}
              onClick={() => {goToPage("/coming-soon"); setOpenMobileMenu(false);}}
            >
              News
            </div>
            <div
              className={`${
                // pathname == "/download"
                //   ? "text-white px-8 py-4 bg-[#32187E] hover:cursor-pointer"
                //   : "text-white px-8 py-4 hover:cursor-pointer"
                "text-white px-8 py-4 hover:cursor-pointer border-b border-b-gray-500"
              }`}
              onClick={() => {goToPage("/download"); setOpenMobileMenu(false);}}
            >
              Download
            </div>
            {loginInfo.account == "" && (
              <div
                className={`${
                  // pathname == "/login"
                  //   ? "text-white px-8 py-4 bg-[#32187E] hover:cursor-pointer"
                  //   : "text-white px-8 py-4 hover:cursor-pointer"
                  "text-white px-8 py-4 hover:cursor-pointer border-b border-b-gray-500"
                }`}
                onClick={() =>{setOpenMobileMenu(false); openLogin();}}
              >
                Login
              </div>
            )}
            {loginInfo.account == "" && (
              <div
                className={`${
                  // pathname == "/login"
                  //   ? "text-white px-8 py-4 bg-[#32187E] hover:cursor-pointer"
                  //   : "text-white px-8 py-4 hover:cursor-pointer"
                  "text-white px-8 py-4 hover:cursor-pointer"
                }`}
                onClick={() => {setOpenMobileMenu(false); openRegister();}}
              >
                Register
              </div>
            )}
            {loginInfo.account != "" && <div
              className={`${
                // pathname == "/donation"
                //   ? "text-white px-8 py-4 bg-[#32187E] hover:cursor-pointer"
                //   : "text-white px-8 py-4 hover:cursor-pointer"
                "text-white px-8 py-4 hover:cursor-pointer border-b border-b-gray-500"
              }`}
              onClick={() => {goToPage("/donation"); setOpenMobileMenu(false);}}
            >
              Donation
            </div>}
            {loginInfo.account != "" && (
              <div
                className={`${
                  // pathname == "/account"
                  //   ? "text-white px-8 py-4 bg-[#32187E] hover:cursor-pointer"
                  //   : "text-white px-8 py-4 hover:cursor-pointer"
                  "text-white px-8 py-4 hover:cursor-pointer"
                }`}
                onClick={() => {goToPage("/user-panel"); setOpenMobileMenu(false);}}
              >
                User Panel
              </div>
            )}
            {loginInfo.account != "" && (
              <div
                className={`${
                  // pathname == "/resetpin2"
                  //   ? "text-white px-8 py-4 bg-[#32187E] hover:cursor-pointer"
                  //   : "text-white px-8 py-4 hover:cursor-pointer"
                  "text-white px-8 py-4 hover:cursor-pointer"
                }`}
                onClick={() => {setOpenMobileMenu(false); doLogout();}}
              >
                Logout
              </div>
            )}
          </div>
        </div>
      </div>
      {registerIsOpen &&  <PopupRegister onClose={closeRegister} />}
      {resendVerificationIsOpen &&  <PopupResendVerification onClose={closeResendVerification} />}
      {loginIsOpen && <PopupLogin onClose={closeLogin} />}
      {forgotPasswordIsOpen && <PopupForgotPassword onClose={closeForgotPassword} />}
    </header>
  );
}
