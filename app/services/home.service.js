import { apiKey } from "./config";
import baseServices from "./base.service";

const home = {
  home(params) {
    params.rc = apiKey;
    return new Promise((resolve, reject) => {
      baseServices
        .post("/home", params)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  page(params) {
    params.rc = apiKey;
    return new Promise((resolve, reject) => {
      baseServices
        .post("/page", params)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  rank(params) {
    params.rc = apiKey;
    return new Promise((resolve, reject) => {
      baseServices
        .post("/rank", params)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  spawnboss(params) {
    params.rc = apiKey;
    return new Promise((resolve, reject) => {
      baseServices
        .post("/spawnboss", params)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  download(params) {
    params.rc = apiKey;
    return new Promise((resolve, reject) => {
      baseServices
        .post("/download", params)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  inspect(params) {
    params.rc = apiKey;
    return new Promise((resolve, reject) => {
      baseServices
        .post("/char/inspect", params)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  item(params) {
    params.rc = apiKey;
    return new Promise((resolve, reject) => {
      baseServices
        .post("/item/info", params)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  discord(params) {
    params.rc = apiKey;
    return new Promise((resolve, reject) => {
      baseServices
        .post("/discord", params)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
};

export default home;
