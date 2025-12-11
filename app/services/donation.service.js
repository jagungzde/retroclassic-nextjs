import { apiKey } from "./config";
import baseServices from "./base.service";

const donation = {
  donation(params) {
    params.rc = apiKey;
    return new Promise((resolve, reject) => {
      baseServices
        .post("/donation", params)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
};

export default donation;
