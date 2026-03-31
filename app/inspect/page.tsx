"use client";
// import LogoBanner from "@/app/components/logoBanner";
import { useEffect, useState } from "react";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
// import home from "@/app/services/home.service";
import ServerStatus from "../components/serverStatus";
import tokenService from "../services/token.service";
import home from "../services/home.service";
import { useRouter } from "next/navigation";

export default function Inspect() {
    const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [eqp, setEqp] = useState([]);
  const [inv, setInv] = useState([]);
  const [store, setStore] = useState([]);
  const [data, setData] = useState({
    cls: -1,
    create_time: 0,
    delete_time: 0,
    eqp: "[]",
    exp: 0,
    gender: 0,
    hp: 0,
    id: 0,
    inv: "[]",
    invader_state: 0,
    invader_time: 0,
    lastlogin_time: 0,
    lastupdatedata: "2025-11-24T13:45:17.000Z",
    level: 0,
    level2: 0,
    money: 0,
    mp: 0,
    name: "",
    pariah_time: 0,
    posx: 0,
    posy: 0,
    posz: 0,
    pp: 0,
    race: -1,
    reputation: 0,
    sp: 0,
    spouse: 0,
    status: 0,
    store: "[]",
    time_used: 0,
    str:0,
    agi:0,
    con:0,
    int:0,
    chi:0,
    maxhp:0,
    maxmp:0,
    hpgen:0,
    mpgen:0,
    attack:0,
    defence:0,
    armor:0,
    mindamage:0,
    maxdamage:0,
    minmdamage:0,
    maxmdamage:0,
    worldid:0,
    storemoney: 0,
    logdata: []
  });

  const [logData, setLogData] = useState([]);
  const [detailItem, setDetailItem] = useState({
    color: "",
    name:""
  });

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

  const raceList = [
    { id: 0, label: "Human" },
    { id: 1, label: "Untamed" },
    { id: 2, label: "Untamed" },
    { id: 4, label: "Winged Elf" },
    { id: 5, label: "Winged Elf" },
  ];

  const doSubmit = () => {
    if (nickname.length <= 0) {
      alert("Please input nickname");
      return false;
    }

    home
      .inspect({
        name: nickname,
      })
      .then(async (res) => {
        if (res.flag == 1) {

          let eqp = JSON.parse(res.data.eqp);
          for(let i=0; i<eqp.length; i++){
            await home.item({id: eqp[i].id}).then((res2) => {
              eqp[i].color = res2.color;
              eqp[i].name = res2.name;
            });
          }

          let inv = JSON.parse(res.data.inv);
          for(let i=0; i<inv.length; i++){
            await home.item({id: inv[i].id}).then((res2) => {
              inv[i].color = res2.color;
              inv[i].name = res2.name;
            });
          }

          let store = JSON.parse(res.data.store);
          for(let i=0; i<store.length; i++){
            await home.item({id: store[i].id}).then((res2) => {
              store[i].color = res2.color;
              store[i].name = res2.name;
            });
          }

          setData(res.data);
          setEqp(eqp);
          setInv(inv);
          setStore(store);
          setLogData(res.data.logdata);
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
    return "-";
  };

  const getRaceName = (id: number) => {
    for (let i = 0; i < raceList.length; i++) {
      if (id == raceList[i].id) {
        return raceList[i].label;
      }
    }
    return "-";
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

  const formatNumberWithSeparator = (numberValue: number) => {
    if (numberValue == null || numberValue == undefined) return "0";
    return numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getActionDescription = (log: any) => {
    if (!log) return 'Unknown action';
    
    switch (log.action) {
      case 'Login':
      case 'LOGIN':
        return 'Player logged in';
        
      case 'Logout':
      case 'LOGOUT':
        return 'Player logged out';
        
      case 'Enter World':
        return 'Player entered the game world';
        
      case 'DROP':
        if (log.details?.itemId && log.details?.quantity) {
          return `Dropped item ${log.details.itemId} (x${log.details.quantity})`;
        }
        return 'Dropped an item';
        
      case 'PICKUP':
        if (log.details?.itemId && log.details?.quantity) {
          return `Picked up item ${log.details.itemId} (x${log.details.quantity})`;
        }
        return 'Picked up an item';
        
      case 'SYSMAIL':
        return `System mail sent (Mail ID: ${log.details?.mailId || 'Unknown'})`;
        
      case 'GETMAIL':
        return `Retrieved mail item ${log.details.itemId} (x${log.details.quantity})${log.details.money > 0 ? `, money ${formatNumberWithSeparator(log.details.money)}` : ''} from ${log.details.senderName} `;
        
      case 'TRADE':
        const totalItems = log.details?.totalItems || 0;
        const gold1Amount = log.details?.gold1Amount || 0;
        const gold2Amount = log.details?.gold2Amount || 0;
        const player1Name = log.details?.player1Name || `Player ${log.details?.player1Id}`;
        const player2Name = log.details?.player2Name || `Player ${log.details?.player2Id}`;
        
        let description = `Trade: ${player1Name} ↔ ${player2Name}`;
        if (totalItems > 0) {
          description += ` - ${totalItems} item(s)`;
        }
        if (gold1Amount > 0 || gold2Amount > 0) {
          description += ` - Gold: ${formatNumberWithSeparator(gold1Amount)} / ${formatNumberWithSeparator(gold2Amount)}`;
        }
        return description;
        
      case 'GSHOPTRADE':
        // const tradeType = this.getTradeType(log.details?.type);
        return `Gold Shop trade`;
        
      default:
        return log.action || 'Unknown action';
    }
  }

  const bgLog = (action:string) => {
    let bgColor = '';
    switch(action){
      case 'PICKUP': 
      case 'GETMAIL': bgColor="bg-green-50"; break;
      case 'DROP': 
      case 'GSHOPTRADE': bgColor="bg-yellow-50"; break;
      case 'SYSMAIL': bgColor="bg-purple-50"; break;
      case 'TRADE': bgColor="bg-orange-50"; break;
    }
    return bgColor;
  }

  const tagAction = (action:string) => {
    let styles = '';
    switch(action){
      case 'PICKUP': 
      case 'GETMAIL': styles="bg-green-100 text-green-800"; break;
      case 'DROP': 
      case 'GSHOPTRADE': styles="bg-yellow-100 text-yellow-800"; break;
      case 'SYSMAIL': styles="bg-purple-100 text-purple-800"; break;
      case 'TRADE': styles="bg-orange-100 text-orange-800"; break;
      default: 
        styles="bg-gray-100 text-gray-800";
    }
    return styles;
  }

  function parseItems(str:string) {
    return str
      .split(";")                 // pisahkan per item
      .filter(Boolean)            // buang string kosong (akibat ; di akhir)
      .map(item => {
        const [itemId, , qty] = item.split(",");
  
        return {
          itemId: Number(itemId),
          qty: Number(qty),
        };
      });
  }

  const getItemData = async (e:React.MouseEvent<HTMLDivElement> ,itemId:number) => {

    const wrapper = e.currentTarget; // div wrapper yang sedang kena event
    const itemname = wrapper.querySelector<HTMLElement>(".itemname"); // class di dalam wrapper tsb

    
    if(itemname?.textContent == ""){
      await home.item({id: itemId}).then((res2) => {
        // setDetailItem({color: res2.color, name: res2.name});
        if(res2.flag == 1){
          if(itemname){
            itemname.textContent = res2.name;
            itemname.style.color = "#"+res2.color;
            // itemname.classList.add("!text-[#"+res2.color+"]");
          }
        }
      });
    }
    
  }

  const renderImgTrade = (itemsString:string) => {
    const items = parseItems(itemsString);

    return items.map((item:any, idx:number) => (
      <div className="relative w-9 group" key={idx} onMouseEnter={(e) => getItemData(e, item.itemId)}>
        <img
          src={`https://img.retroclassic.asia/items/${item.itemId}.jpg`}
          alt={`item ${item.itemId}`}
          className="w-9 h-9 rounded shadow border border-gray-400 bg-white"
          loading="lazy"
          key={idx}
        />
        <div className="flex">
          <div className="absolute hidden group-hover:block -top-2 left-full bg-gray-800 border border-gray-600 text-white z-40 text-sm rounded-lg px-2 w-[100px]"><span className="itemname"></span> x {item.qty}</div>
        </div>
      </div>
      
    )) 
  }
  //#endregion

  useEffect(() => {
    if (tokenService.getToken() == null) router.push("/");
  });

  return (
    <div className="relative flex flex-col justify-start font-sans bg-[url(/images/home_main_bg.webp),_url(/images/home_header_bg.webp)] bg-[contain, contain] bg-position-[center_190px,top] sm:bg-position-[center_250px,top] md:bg-position-[center_250px,top] lg:bg-position-[center_250px,top] bg-size-[130%] lg:bg-auto bg-no-repeat bg-blend-normal ">
      <Header />
      <div className="mt-10">
        <ServerStatus />
      </div>
      <div className="my-10">
        <div className="w-[95%] max-w-[1200px] bg-[#222222] border-2 border-gray-500 shadow-2xl m-auto py-8 px-2">
          <div className="text-lg text-center font-bold pb-5">INSPECT</div>
          <div className="w-full">
            <div className="w-full max-w-[1220px] m-auto mb-6 mt-1 pb-4 pt-2 relative">
              <div className="flex justify-center p-1 mb-4">
                <input
                  type="text"
                  name="nickname"
                  id="nickname"
                  placeholder="Nickname"
                  className="w-full max-w-[200px] rounded-[8px] bg-[#E4E4E4] text-[#3A1343] focus:outline-none py-2 px-4 text-sm"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <button
                  type="button"
                  className="w-full max-w-[150px] rounded-xl bg-amber-800 text-white hover:cursor-pointer hover:bg-amber-600 ml-2"
                  onClick={doSubmit}
                >
                  Inspect
                </button>
              </div>
              <div className="w-full  grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 text-sm">
                <div className="bg-gray-100 rounded-2xl shadow border border-gray-200 overflow-hidden">
                  <div className="bg-slate-500 text-white text-center font-semibold py-2">
                    Character Info
                  </div>

                  <div className="bg-gray-400 text-white text-center text-xs font-semibold py-1">
                    General
                  </div>

                  <div className="px-5 py-3 space-y-1 text-black ">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="font-medium">
                        {data.status == 1 ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Creation Time:</span>
                      <span>
                        {data.create_time == 0
                          ? "-"
                          : formatTimestamp(data.create_time)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Login:</span>
                      <span>
                        {data.lastlogin_time == 0
                          ? "-"
                          : formatTimestamp(data.lastlogin_time)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-400 text-white text-center text-xs font-semibold py-1 mt-2">
                    Location
                  </div>
                  <div className="px-5 py-3 space-y-1 text-black">
                    <div className="flex justify-between">
                      <span>World ID:</span>
                      <span>{data.worldid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Position X:</span>
                      <span>{data.posx}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Position Y:</span>
                      <span>{data.posy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Altitude:</span>
                      <span>{data.posz}</span>
                    </div>
                  </div>

                  <div className="bg-gray-400 text-white text-center text-xs font-semibold py-1 mt-2">
                    PK
                  </div>
                  <div className="px-5 py-3 space-y-1 mb-2 text-black">
                    <div className="flex justify-between">
                      <span>PK Mode:</span>
                      <span>{data.invader_state == 0 ? "Off" : "On"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Invader Time:</span>
                      <span>{data.invader_time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pariah Time:</span>
                      <span>{data.pariah_time}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-2xl shadow border border-gray-200 overflow-hidden">
                  <div className="bg-slate-500 text-white text-center font-semibold py-2">
                    Character Properties
                  </div>

                  <div className="bg-gray-400 text-center py-1 font-semibold">
                    {data.name}
                  </div>

                  <div className="px-5 py-3 space-y-1 text-black">
                    <div className="grid grid-cols-2 gap-x-4">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Level:</span>
                          <span>{data.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>HP:</span>
                          <span>{formatNumberWithSeparator(data.hp)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>MP:</span>
                          <span>{formatNumberWithSeparator(data.mp)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Race:</span>
                          <span>{getRaceName(data.race)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gender:</span>
                          <span>{data.gender == 0 ? "Male" : "Female"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Faction:</span>
                          <span>None</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-black">
                        <div className="flex justify-between">
                          <span>Reputation:</span>
                          <span>{data.reputation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>XP:</span>
                          <span>{formatNumberWithSeparator(data.exp)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SP:</span>
                          <span>{formatNumberWithSeparator(data.sp)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Job:</span>
                          <span>{getJobName(data.cls)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Spouse:</span>
                          <span>{data.spouse == 0 ? "None" : ""}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-400 text-white text-center text-xs font-semibold py-1">
                    Attributes
                  </div>
                  <div className="px-5 py-3 space-y-1 text-black">
                    <div className="grid grid-cols-2 gap-x-4">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>STR:</span>
                          <span>{data.str}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>AGI:</span>
                          <span>{data.agi}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>CON:</span>
                          <span>{data.con}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>INT:</span>
                          <span>{data.int}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>CHI:</span>
                          <span>{data.chi}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-400 text-white text-center text-xs font-semibold py-1">
                    Base Stats
                  </div>
                  <div className="px-5 py-3 space-y-1 mb-2 text-black">
                    <div className="grid grid-cols-2 gap-x-4">
                      <div className="space-y-1">
                      <div className="flex justify-between">
                          <span>Max HP:</span>
                          <span>{data.maxhp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max MP:</span>
                          <span>{data.maxmp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>HP Gen:</span>
                          <span>{data.hpgen}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>MP Gen:</span>
                          <span>{data.mpgen}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Attack:</span>
                          <span>{data.attack}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Defence:</span>
                          <span>{data.defence}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Armor:</span>
                          <span>{data.armor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Min Damage:</span>
                          <span>{data.mindamage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max Damage:</span>
                          <span>{data.maxdamage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Min Magic Damage:</span>
                          <span>{data.minmdamage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max Magic Damage:</span>
                          <span>{data.maxmdamage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-2xl shadow border border-gray-200 overflow-visible">
                  <div className="bg-slate-500 text-white text-center font-semibold py-2 rounded-t-2xl">
                    Character Items
                  </div>

                  <div className="bg-gray-400 text-white text-center text-xs font-semibold py-1">
                    Equipment ({eqp.length} items)
                  </div>
                  <div className="px-4 py-3 text-black">
                    {eqp.length == 0 && (
                      <div className="text-center text-sm">
                        No item available
                      </div>
                    )}
                    <div className="grid grid-cols-6 gap-2 text-black">
                      {eqp.map((item: any, idx: any) => (
                        <div className="w-9 h-9 relative group " key={idx} onMouseEnter={(e) => getItemData(e, item.id)}>
                          <img
                            src={`https://img.retroclassic.asia/items/${item.id}.jpg`}
                            alt={item.id}
                            className="w-9 h-9 rounded shadow border border-gray-400 bg-white"
                            key={idx}
                            loading="lazy"
                          />
                          {/* <div className={`absolute -top-8 left-full z-40 text-xs max-w-20 bg-gray-700 border border-gray-500 rounded py-1 px-2 hidden group-hover:block transition-all duration-300 text-pretty `} style={{ color: item.color ? `#${item.color}` : '#ffffff' }}>{item.count > 1 ? item.name +' x '+item.count : item.name}</div> */}
                          <div className="absolute hidden group-hover:block -top-2 left-full bg-gray-800 border border-gray-600 text-white z-40 text-sm rounded-lg px-2 w-[100px]"><span className="itemname"></span> {item.count > 0 ? `x ${item.count}` : ''}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-400 text-white text-center text-xs font-semibold py-1">
                    Inventory ({inv.length} items)
                  </div>
                  <div className="px-4 py-3 text-black">
                    {inv.length == 0 && (
                      <div className="text-center text-sm">
                        No item available
                      </div>
                    )}
                    <div className="grid grid-cols-6 gap-2 text-black">
                      {inv.map((item: any, idx: any) => (
                        <div className="w-9 h-9 relative group " key={idx} onMouseEnter={(e) => getItemData(e, item.id)}>
                          <img
                            src={`https://img.retroclassic.asia/items/${item.id}.jpg`}
                            alt={item.id}
                            className="w-9 h-9 rounded shadow border border-gray-400 bg-white"
                            key={idx}
                            loading="lazy"
                          />
                          {/* <div className={`absolute -top-8 left-full z-40 text-xs max-w-20 bg-gray-700 border border-gray-500 rounded py-1 px-2 hidden group-hover:block transition-all duration-300 text-pretty `} style={{ color: item.color ? `#${item.color}` : '#ffffff' }}>{item.count > 1 ? item.name +' x '+item.count : item.name}</div> */}
                          <div className="absolute hidden group-hover:block -top-2 left-full bg-gray-800 border border-gray-600 text-white z-40 text-sm rounded-lg px-2 w-[100px]"><span className="itemname"></span> {item.count > 0 ? `x ${item.count}` : ''}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-400 text-white text-center text-xs font-semibold py-1">
                    Storehouse ({store.length} items)
                  </div>
                  <div className="px-4 py-3 space-y-3 text-black">
                    {store.length == 0 && (
                      <div className="text-center text-sm">
                        No item available
                      </div>
                    )}
                    <div className="grid grid-cols-6 gap-2 text-black">
                      {store.map((item: any, idx: any) => (
                        <div className="w-9 h-9 relative group overflow-visible" key={idx} onMouseEnter={(e) => getItemData(e, item.id)}>
                          <img
                            src={`https://img.retroclassic.asia/items/${item.id}.jpg`}
                            alt={item.id}
                            className="w-9 h-9 rounded shadow border border-gray-400 bg-white"
                            key={idx}
                            loading="lazy"
                          />
                          {/* <div className={`absolute -top-8 left-full z-40 text-xs max-w-20 bg-gray-700 border border-gray-500 rounded py-1 px-2 hidden group-hover:block transition-all duration-300 text-pretty `} style={{ color: item.color ? `#${item.color}` : '#ffffff' }}>{item.count > 1 ? item.name +' x '+item.count : item.name}</div> */}
                          <div className="absolute hidden group-hover:block -top-2 left-full bg-gray-800 border border-gray-600 text-white z-40 text-sm rounded-lg px-2 w-[100px]"><span className="itemname"></span> {item.count > 0 ? `x ${item.count}` : ''}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-400 text-white text-center text-xs font-semibold py-1">
                    Coins
                  </div>
                  <div className="px-5 py-3 mb-2 space-y-1 text-black">
                    <div className="flex justify-between">
                      <span>Pockets:</span>
                      <span>{formatNumberWithSeparator(data.money)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Store:</span>
                      <span>{formatNumberWithSeparator(data.storemoney)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-2xl shadow border border-gray-200 overflow-hidden lg:col-span-3">
                  <div className="bg-slate-500 text-white text-center font-semibold py-2 rounded-t-2xl">Character Activity Logs</div>
                  <div className="overflow-y-auto max-h-[300px] rounded-b-2xl">
                    {logData.filter((item:any) => item.action != 'LOGIN' && item.action != 'LOGOUT').length == 0 && <div className="w-full text-center py-3 text-gray-900">No activity logs found</div>}
                    {logData
                      .filter((item:any) => item.action != 'LOGIN' && item.action != 'LOGOUT')
                      .map((item:any, idx:number) => 
                      <div className={`flex flex-row justify-between gap-x-3 p-4 border-b border-b-gray-300 ${bgLog(item.action)} `} key={idx}>
                        <div className="">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tagAction(item.action)} `}>{item.action}</span>
                        </div>
                        <div className="grow flex flex-col">
                          <div className="text-sm text-gray-900 font-medium">{getActionDescription(item)}</div>
                          {/* <!-- Quick Info --> */}
                          <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                            {item.details?.itemId && item.action !== 'TRADE' && (
                              <span>Item ID: { item.details.itemId }</span>)}
                            {item.details?.quantity && item.action !== 'TRADE' && (
                              <span>Qty: { item.details.quantity }</span>)}
                            {item.details?.price && (
                              <span>Price: { item.details.price }</span>)}
                            {/* TRADE specific info */}
                            {item.action == 'TRADE' && item.details?.totalItems && (
                              <span>Total Items: { item.details.totalItems }</span>)}
                            {item.action == 'TRADE' && (item.details?.gold1Amount > 0 || item.details?.gold2Amount > 0) && (
                              <span>Gold: { formatNumberWithSeparator(item.details.gold1Amount || 0) } / { formatNumberWithSeparator(item.details.gold2Amount || 0) }</span>)}
                          </div>
                          <div className="mt-2">
                              {item.details?.itemId && item.action !== 'TRADE' && (
                                <div className="relative w-9 group" onMouseEnter={(e) => getItemData(e, item.details?.itemId)}>
                                  <img
                                    src={`https://img.retroclassic.asia/items/${item.details?.itemId}.jpg`}
                                    alt={`item ${item.details?.itemId}`}
                                    className="w-9 h-9 rounded shadow border border-gray-400 bg-white"
                                    loading="lazy"
                                  />
                                  <div className="flex">
                                    <div className="absolute hidden group-hover:block -top-2 left-full bg-gray-800 border border-gray-600 text-white z-40 text-sm rounded-lg px-2 w-[100px]"><span className="itemname"></span> {item.details?.quantity > 0 ? `x ${item.details?.quantity}` : ''}</div>
                                  </div>
                                </div>
                              )}
                              {item.action == 'TRADE' && item.details?.items1 != "" && (
                                <div className="flex flex-wrap gap-1">
                                  {renderImgTrade(item.details?.items1)}
                                </div>
                              )}
                              {item.action == 'TRADE' && item.details?.items2 != "" && (
                                <div className="flex flex-wrap gap-1">
                                  {renderImgTrade(item.details?.items2)}
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{item.timestamp}</div>
                      </div>
                    )}
                  </div>
              </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
