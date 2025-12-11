import { apiKey } from "./config";
import baseServices from "./base.service";

const rank = {
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
};

export default rank;
