/* eslint-disable */
import axios from "axios";
import TokenService from "@/app/services/token.service";

const loginConfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const baseUrl = "https://retroclassic.asia/api";
let isInit = false;

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const errorHandler = (error) => {
  // console.log("coba", error);
  if (!error.response) {
    // NETWORK ERROR
    return Promise.reject(new Error("Network Error"));
  } else if (error.response.status === 401 || error.response.status === 403) {
    // AUTH ERROR
    Promise.reject(error.response.data.error);
    // store.dispatch(LOGOUT);

    return Promise.reject(error.response.data.error);
  } else {
    // OTHER ERROR
    return Promise.reject(error.response);
  }
};

const successHandler = (response) => {
  // LOGIN REQuEST
  // if (!response.data.status) return Promise.resolve(response.data);
  // OTHER REQUEST
  if (response.data.flag === 1) return Promise.resolve(response.data);
  else if (response.data.flag == -99) {
    //do logout
    return Promise.resolve(response.data);
  } else return Promise.resolve(response.data);
};

const setHeader = () => {
  let tokenObject = TokenService.getToken();
  if (!tokenObject) {
    // this.$store.dispatch(LOGOUT);
  } else {
    axios.defaults.headers.common["Authorization"] = "" + tokenObject;
  }

  // let tokenCookie = TokenService.getTokenCookie();
  // if (!tokenCookie) {
  //   const sid = makeid(32);
  //   tokenServices.saveCookie(sid);
  //   tokenCookie = sid;
  // }
  // axios.defaults.headers.common["Cookie"] = "cookieid=" + tokenCookie;
};

const removeHeader = () => {
  delete axios.defaults.headers.common["Authorization"];
};

const refreshCookie = () => {
  // const sid = makeid(32);
  // tokenServices.saveCookie(sid);
  // tokenCookie = sid;
  // axios.defaults.headers.common["Cookie"] = "cookieid=" + tokenCookie;
};

const init = () => {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.withCredentials = true;
  // axios.defaults.headers = loginConfig;
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  axios.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
  );
  setHeader();
  isInit = true;
};

const buildQuery = (qObject) => {
  let retVal = "";
  let keys = Object.keys(qObject);
  keys.forEach((x, i) => {
    if (i === 0) retVal += `?${x}=${qObject[x]}`;
    else retVal += `&${x}=${qObject[x]}`;
  });
  return retVal;
};

const get = (resource, query) => {
  if (!isInit) init();
  if (query) resource += buildQuery(query);
  return axios.get(resource);
};

const post = (resource, params, query = null) => {
  if (!isInit) init();
  if (query) resource += buildQuery(query);
  return axios.post(resource, params);
};

const put = (resource, params, query) => {
  if (!isInit) init();
  if (query) resource += buildQuery(query);
  return axios.put(resource, params);
};

const download = (resource, params, config, query) => {
  if (!isInit) init();
  if (query) resource += buildQuery(query);
  return axios.post(resource, params, config);
};

const xdelete = (resource, query) => {
  if (!isInit) init();
  if (query) resource += buildQuery(query);
  return axios.delete(resource);
};

const base = {
  errorHandler,
  successHandler,
  setHeader,
  removeHeader,
  init,
  buildQuery,
  get,
  post,
  put,
  download,
  xdelete,
  refreshCookie,
};

export default base;
