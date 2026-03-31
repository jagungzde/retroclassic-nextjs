"use client"
// import LogoBanner from "@/app/components/logoBanner";
import { useEffect, useState } from "react";
import auth from "@/app/services/auth.service";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
// import home from "@/app/services/home.service";
import tokenService from "../services/token.service";
import eventService from "@/app/services/event.service";
import ServerStatus from "../components/serverStatus";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    logout,
    setCharList,
    setLoginInfo,
  } from "@/lib/features/auth/authSlice";
import PopupChangePassword from "../components/popupChangePassword";
import PopupManagement from "../components/popupManagement";
import ClaimPreregis from "./components/claimPreregis";

export default function Download(){
    const router = useRouter();
    const dispatch = useAppDispatch();
    const loginInfo = useAppSelector((state) => state.auth.loginInfo);
    const [listChar, setListChar] = useState([]);
    const [char, setChar] = useState("0");
    const [charInfo, setCharInfo] = useState({
        base: {
            version: 0,
            id: 0,
            name: "",
            race: 0,
            cls: -1,
            gender: 0,
            custom_data: "",
            config_data: "",
            custom_stamp: 0,
            status: 0,
            delete_time: 0,
            create_time: 0,
            lastlogin_time: 0,
            forbidcount: 0,
            forbid: [
              // {
              //   type: 0,
              //   time: 0,
              //   createtime: 0,
              //   reason: "",
              // },
            ],
            help_states: "",
            spouse: 0,
            userid: 0,
            cross_data: "",
            reserved2: 0,
            reserved3: 0,
            reserved4: 0,
          },
          status: {
            sversion: 0,
            level: 0,
            level2: 0,
            exp: 0,
            sp: 0,
            pp: 0,
            hp: 0,
            mp: 0,
            posx: 0,
            posy: 0,
            posz: 0,
            worldtag: 1,
            invader_state: 0,
            invader_time: 0,
            pariah_time: 0,
            reputation: 0,
            custom_status: "",
            filter_data: "",
            charactermode: "",
            instancekeylist: "",
            dbltime_expire: 0,
            dbltime_mode: 0,
            dbltime_begin: 0,
            dbltime_used: 0,
            dbltime_max: 0,
            time_used: 0,
            dbltime_data: "",
            storesize: 0,
            petcorral: "",
            property: "",
            var_data: "",
            skills: "",
            storehousepasswd: "",
            waypointlist: "",
            coolingtime: "",
            npc_relation: "",
            multi_exp_ctrl: "",
            storage_task: "",
            faction_contrib: "",
            force_data: "",
            online_award: "",
            profit_time_data: "",
            country_data: "",
            king_data: "",
            meridian_data: "",
            extraprop: "",
            title_data: "",
            reincarnation_data: "",
            realm_data: "",
            reserved2: 0,
            reserved3: 0,
          },
          pocket: {
            icapacity: 0,
            timestamp: 0,
            money: 0,
            invcount: 0,
            inv: [
              // {
              //   id: 0,
              //   pos: 0,
              //   count: 0,
              //   max_count: 0,
              //   data: "",
              //   proctype: 0,
              //   expire_date: 0,
              //   guid1: 0,
              //   guid2: 0,
              //   mask: 0,
              // },
              // {
              //   id: 0,
              //   pos: 0,
              //   count: 0,
              //   max_count: 0,
              //   data: "",
              //   proctype: 0,
              //   expire_date: 0,
              //   guid1: 0,
              //   guid2: 0,
              //   mask: 0,
              // },
              // {
              //   id: 0,
              //   pos: 0,
              //   count: 0,
              //   max_count: 0,
              //   data: "",
              //   proctype: 0,
              //   expire_date: 0,
              //   guid1: 0,
              //   guid2: 0,
              //   mask: 0,
              // },
              // {
              //   id: 0,
              //   pos: 0,
              //   count: 0,
              //   max_count: 0,
              //   data: "",
              //   proctype: 0,
              //   expire_date: 0,
              //   guid1: 0,
              //   guid2: 0,
              //   mask: 0,
              // },
              // {
              //   id: 0,
              //   pos: 0,
              //   count: 0,
              //   max_count: 0,
              //   data: "",
              //   proctype: 0,
              //   expire_date: 0,
              //   guid1: 0,
              //   guid2: 0,
              //   mask: 0,
              // },
              // {
              //   id: 0,
              //   pos: 0,
              //   count: 0,
              //   max_count: 0,
              //   data: "",
              //   proctype: 0,
              //   expire_date: 0,
              //   guid1: 0,
              //   guid2: 0,
              //   mask: 0,
              // },
            ],
            reserved6: 0,
            reserved7: 0,
          },
          equipment: {
            eqpcount: 0,
            eqp: [
              // {
              //   id: 0,
              //   pos: 0,
              //   count: 1,
              //   max_count: 1,
              //   data: "",
              //   proctype: 0,
              //   expire_date: 0,
              //   guid1: 0,
              //   guid2: 0,
              //   mask: 0,
              // },
            ],
          },
          storehouse: {
            capacity: 0,
            money: 0,
            storecount: 0,
            store: [],
            size1: 0,
            size2: 0,
            dresscount: 0,
            dress: [],
            materialcount: 0,
            material: [],
            size3: 0,
            generalcardcount: 0,
            generalcard: [],
            reserved: 0,
          },
          task: {
            task_data: "",
            task_complete: "",
            task_finishtime: "",
            task_inventorycount: 0,
            task_inventory: [],
          },
    });

    const [changePasswordIsOpen, setChangePasswordIsOpen] = useState(false);
    const [managementIsOpen, setManagementIsOpen] = useState(false);

    const classList = [
      { id: 0, label: "Blademaster" },
      { id: 1, label: "Wizard" },
      { id: 2, label: "Psychic" },
      { id: 3, label: "Venomancer" },
      { id: 4, label: "Barbarian" },
      { id: 5, label: "Assassin" },
      { id: 6, label: "Archer" },
      { id: 7, label: "Cleric" },
      { id: 8, label: "Seeker" },
      { id: 9, label: "Mystic" },
      { id: 10, label: "Duskblade" },
      { id: 11, label: "Stormbringer" },
    ];

    
  
    const getInfo = () => {
        auth.getInfo({ action: "account" })
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
  
    const getChar = () => {
        auth.getCharList({ action: "characters" })
        .then((res) => {
          if (res.flag == 1) {
            console.log(res.data);
            if (res.data != undefined) {
              setListChar(res.data);
              dispatch(setCharList(res.data));
            }
            // if (res.data.length > 0) setChar(res.data[0].char_id);
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
  
    const getCharInfo = () => {
        auth.getCharList({ action: "role", id: char })
        .then((res) => {
          if (res.flag == 1) {
            console.log(res.data);
            if (res.data != undefined) {
              setCharInfo(res.data);
            }
            // if (res.data.length > 0) setChar(res.data[0].char_id);
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

    

    //#region FUNCTION
    const getJobName = (id: number) => {
        for (let i = 0; i < classList.length; i++) {
          if (id == classList[i].id) {
            return classList[i].label;
          }
        }
        return "";
      };

    const convertOnlineTime = (seconds: number) => {
        let str = "";
    
        const detik = seconds % 60;
    
        seconds -= detik;
        const menit = seconds % 3600;
        const menitShow = menit / 60;
    
        seconds -= menit;
        const jam = seconds % 86400;
        const jamShow = jam / 3600;
    
        seconds -= jam;
        const hari = seconds % 2592000;
        const hariShow = hari / 86400;
    
        seconds -= hari;
        const bulan = seconds % 31104000;
        const bulanShow = bulan / 2592000;
    
        const tahun = Math.floor(seconds / 31104000);
    
        if (tahun > 0) str += tahun + " years ";
        if (bulanShow > 0) str += bulanShow + " months ";
        if (hariShow > 0) str += hariShow + " days ";
        if (jamShow > 0) str += jamShow + " hours ";
        if (menitShow > 0) str += menitShow + " minutes ";
        if (detik > 0) str += detik + " seconds ";
    
        return str;
      };
    
      const formatNumberWithSeparator = (numberValue: number) => {
        if (numberValue == null || numberValue == undefined) return "0";
        return numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    //#endregion

    useEffect(() => {
        getCharInfo();
      }, [char]);

    useEffect(() => {
        if (tokenService.getToken() == null) router.push("/");
        else {
          getInfo();
          getChar();
        }
    }, []);

    const handleOpenChangePassword = () => {
        setChangePasswordIsOpen(true);
    }

    const handleCloseChangePassword = () => {
        setChangePasswordIsOpen(false);
    }

    const handleOpenManagement = () => {
        setManagementIsOpen(true);
    }

    const handleCloseManagement = () => {
        setManagementIsOpen(false);
    }

    const doLogout = () => {
        dispatch(logout());
        router.push("/");
    }


    return (
        <div className="relative flex flex-col justify-start font-sans bg-[url(/images/home_main_bg.webp),_url(/images/home_header_bg.webp)] bg-[contain, contain] bg-position-[center_190px,top] sm:bg-position-[center_250px,top] md:bg-position-[center_250px,top] lg:bg-position-[center_250px,top] bg-size-[130%] lg:bg-auto bg-no-repeat bg-blend-normal ">
            <Header />
            <div className="mt-10">
            <ServerStatus />
            </div>
            <div className="my-10">
                <div className="w-[95%] max-w-[1200px] bg-[#222222] border-2 border-gray-500 shadow-2xl m-auto py-8 px-10">
                    <div className="text-lg text-center font-bold pb-5">
                        USER PANEL
                    </div>
                    <div className="w-full py-4 px-2 border-b border-b-gray-700 border-t border-t-gray-700">
                        <div className="text-xl text-white font-bold">{loginInfo.account}</div>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row justify-evenly ">
                        <div className="w-full  lg:max-w-[300px] pr-0 lg:pr-2 border-r border-r-gray-600 pt-4">
                            <div className="field">
                                <select
                                    value={char}
                                    onChange={(e) => setChar(e.target.value)}
                                    >
                                    <option value={"0"} disabled>- CHOOSE CHARATER -</option>
                                    {listChar.map((item: any, idx) => (
                                        <option key={idx} value={item.id}>
                                        {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="bg-gray-900 p-2 mb-4">
                                <div className="text-white mb-2">Character Info</div>
                                <table className="w-full text-sm!">
                                    <tr>
                                        <td className="text-left!">Job</td>
                                        <td className="w-[15px]!">:</td>
                                        <td className="text-left! text-amber-200!">{getJobName(charInfo.base.cls)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left!">Level</td>
                                        <td className="w-[15px]!">:</td>
                                        <td className="text-left! text-amber-200!">{charInfo.status.level}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left!">Fame</td>
                                        <td className="w-[15px]!">:</td>
                                        <td className="text-left! text-amber-200!">{charInfo.status.reputation}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left!">Gold</td>
                                        <td className="w-[15px]!">:</td>
                                        <td className="text-left! text-amber-200!">{formatNumberWithSeparator(charInfo.pocket.money)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left!">Gender</td>
                                        <td className="w-[15px]!">:</td>
                                        <td className="text-left! text-amber-200!">{convertOnlineTime(charInfo.status.time_used)}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="bg-gray-900 p-2 mb-4">
                                <div className="text-white mb-2">Account Info</div>
                                <table className="w-full text-sm!">
                                    <tr>
                                        <td className="text-left!">Cash Coin</td>
                                        <td className="w-[15px]!">:</td>
                                        <td className="text-left! text-amber-200!">{formatNumberWithSeparator(loginInfo.cash)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left!">Total Donate<br/>Monthly</td>
                                        <td className="w-[15px]!">:</td>
                                        <td className="text-left! text-amber-200!">{formatNumberWithSeparator(loginInfo.money)}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left!">Last Login</td>
                                        <td className="w-[15px]!">:</td>
                                        <td className="text-left! text-amber-200!">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td className="text-left!">Email</td>
                                        <td className="w-[15px]!">:</td>
                                        <td className="text-left! text-amber-200!">&nbsp;</td>
                                    </tr>
                                    {loginInfo.reff != "" && <tr>
                                        <td className="text-left!">Reff. Name</td>
                                        <td className="w-[15px]!">:</td>
                                        <td className="text-left! text-amber-200!">{loginInfo.reff}</td>
                                    </tr>}
                                    {loginInfo.reff != "" && <tr>
                                        <td className="text-left!">Total Reff.</td>
                                        <td className="w-[15px]!">:</td>
                                        <td className="text-left! text-amber-200!">{loginInfo.reff_total}</td>
                                    </tr>}
                                </table>
                            </div>

                            <div className="pr-4">
                                <div className="p-2 border-b border-b-gray-700 text-gray-200 hover:text-amber-200 hover:cursor-pointer" onClick={handleOpenChangePassword}>Change Password</div>
                                <div className="p-2 border-b border-b-gray-700 text-gray-200 hover:text-amber-200 hover:cursor-pointer" onClick={handleOpenManagement}>Management</div>
                                <div className="p-2 border-b border-b-gray-700 text-gray-200 hover:text-amber-200 hover:cursor-pointer" onClick={() => router.push("/link")}>Link</div>
                                <div className="p-2 border-b border-b-gray-700 text-gray-200 hover:text-amber-200 hover:cursor-pointer" onClick={() => router.push("/inspect")}>Inspect</div>
                                <div className="p-2 border-b border-b-gray-700 text-gray-200 hover:text-amber-200 hover:cursor-pointer" onClick={doLogout}>Logout</div>
                            </div>
                        </div>
                        <div className="grow ">
                            <div className="text-2xl text-gray-200 text-center pt-4">
                              <ClaimPreregis charId={char} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {changePasswordIsOpen && <PopupChangePassword onClose={handleCloseChangePassword} />}
            {managementIsOpen && <PopupManagement onClose={handleCloseManagement} />}
        </div>
    )
}