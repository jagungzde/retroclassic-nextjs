import { createSlice } from "@reduxjs/toolkit";
import tokenServices from "@/app/services/token.service";
import baseServices from "@/app/services/base.service";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loginInfo: {
      account: "",
      logicuid: 0,
      cash: 0,
      money: 0,
      login_ip: "",
      login_time: "",
      reff: "",
      reff_total: 0
      // email: "",
      // lastip: "",
      // reg_date: "",
      // lastlogin: "",
      // cashcoin: 0,
      // t_cashcoin: 0,
      // m_cashcoin: 0,
      // lastchar: "",
      // phone: "",
      // reff: "",
      // reff_total: 0,
      // gachawebpoint: 0, // Added for Gacha Web Point
    },
    charList: [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      tokenServices.saveToken(action.payload);
      baseServices.setHeader();
    },
    setLoginInfo: (state, action) => {
      state.loginInfo = action.payload;
    },
    setCharList: (state, action) => {
      state.charList = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.loginInfo = {
        account: "",
        logicuid: 0,
        cash: 0,
        money: 0,
        login_ip: "",
        login_time: "",
        reff: "",
        reff_total: 0
        // email: "",
        // lastip: "",
        // reg_date: "",
        // lastlogin: "",
        // cashcoin: 0,
        // t_cashcoin: 0,
        // m_cashcoin: 0,
        // lastchar: "",
        // phone: "",
        // reff: "",
        // reff_total: 0,
        // gachawebpoint: 0, // Reset Gacha Web Point on logout
      };
      state.charList = [];
      // window.localStorage.removeItem(TOKEN_KEY);
      tokenServices.destroyToken();
      tokenServices.destroyChar();
      tokenServices.destroyCookie();
      baseServices.removeHeader();
    },
  },
});

export const { setLoginInfo, setToken, setCharList, logout } =
  authSlice.actions;
export const getLoginInfo = (state: any) => state.auth.loginInfo;
export const getToken = (state: any) => state.auth.token;
export const getCharList = (state: any) => state.auth.charList;

export default authSlice.reducer;
