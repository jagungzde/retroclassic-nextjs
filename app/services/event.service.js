import { apiKey } from "./config";
import baseServices from "./base.service";

const event = {
  preregis(params) {
    params.rc = apiKey;
    return new Promise((resolve, reject) => {
      baseServices
        .post("/event/preregis", params)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
};

export default event;
