/* eslint-disable */
const TOKEN_KEY = "rc.tokenkey";
const TOKEN_CHAR = "rc.tokenchar";
const TOKEN_COOKIE = "rc.tokencookie";

export const saveToken = (token) => {
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

export const saveChar = (token) => {
  window.localStorage.setItem(TOKEN_CHAR, token);
};

export const saveCookie = (token) => {
  window.localStorage.setItem(TOKEN_COOKIE, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
};

export const destroyChar = (token) => {
  window.localStorage.removeItem(TOKEN_CHAR);
};

export const destroyCookie = (token) => {
  window.localStorage.removeItem(TOKEN_COOKIE);
};

export const getToken = () => {
  try {
    let tokenObject = window.localStorage.getItem(TOKEN_KEY);
    if (tokenObject) tokenObject = JSON.parse(tokenObject);
    return tokenObject;
  } catch (error) {
    destroyToken();
    return null;
  }
};

export const getTokenChar = () => {
  try {
    let tokenObject = window.localStorage.getItem(TOKEN_CHAR);
    return tokenObject;
  } catch (error) {
    console.log("error", error);
    destroyChar();
    return null;
  }
};

export const getTokenCookie = () => {
  try {
    let tokenObject = window.localStorage.getItem(TOKEN_COOKIE);
    return tokenObject;
  } catch (error) {
    console.log("error", error);
    destroyCookie();
    return null;
  }
};

export default {
  getToken,
  saveToken,
  destroyToken,
  getTokenChar,
  saveChar,
  destroyChar,
  getTokenCookie,
  saveCookie,
  destroyCookie,
};
