
import { apiKey } from "./config";
import baseServices from "./base.service";

const register = (params) => {
  params.rc = apiKey;
  return new Promise((resolve, reject) => {
    baseServices
      .post("/account/register", params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const login = (params) => {
  params.rc = apiKey;
  return new Promise((resolve, reject) => {
    baseServices
      .post("/login", params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const checkActivation = (params) => {
  params.rc = apiKey;
  return new Promise((resolve, reject) => {
    baseServices
      .post("/account/key", params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const activation = (params) => {
  params.rc = apiKey;
  return new Promise((resolve, reject) => {
    baseServices
      .post("/account/activation", params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const resetPassword = (params) => {
  params.rc = apiKey;
  return new Promise((resolve, reject) => {
    baseServices
      .post("/account/newresetpassword", params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const forgotPassword = (params) => {
  params.rc = apiKey;
  return new Promise((resolve, reject) => {
    baseServices
      .post("/account/resetpassword", params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
const getInfo = (params) => {
  params.rc = apiKey;
  return new Promise((resolve, reject) => {
    baseServices
      .post("/info", params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
const getCharList = (params) => {
  params.rc = apiKey;
  return new Promise((resolve, reject) => {
    baseServices
      .post("/info", params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
const resendEmail = (params) => {
  params.rc = apiKey;
  return new Promise((resolve, reject) => {
    baseServices
      .post("/account/resendemail", params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const changePassword = (params) => {
  params.rc = apiKey;
  return new Promise((resolve, reject) => {
    baseServices
      .post("/account/changepassword", params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const forgotPin = (params) => {
  params.rc = apiKey;
  return new Promise((resolve, reject) => {
    baseServices
      .post("/account/forgotpin", params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const forgotBankPin = (params) => {
  params.rc = apiKey;
  return new Promise((resolve, reject) => {
    baseServices
      .post("/account/forgotpinbank", params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const auth = {
  register,
  checkActivation,
  activation,
  login,
  forgotPassword,
  getInfo,
  getCharList,
  resendEmail,
  resetPassword,
  changePassword,
  forgotPin,
  forgotBankPin,
};

export default auth;
