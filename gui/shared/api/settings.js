import axios from "./base/axios";
import httpStatusCodes from "./base/httpStatusCodes";

const getAuctionSettings = async (accessToken) => {
  let config = {
    headers: {
      Authorization: accessToken,
    },
  };

  return await axios.get("/admin/settings/getAuctionSettings", config);
};

const saveAuctionSettings = async (values, accessToken) => {
  let success = false;
  let config = {
    headers: {
      Authorization: accessToken,
    },
  };

  await axios
    .post("/admin/settings/saveAuctionSettings", values, config)
    .then(function (response) {
      success = true;
    })
    .catch(function (error) {
      console.log(error);
    });

  return success;
};

export default {
  getAuctionSettings,
  saveAuctionSettings,
};
