import axios from "./base/axios";

const getDashboardInfo = async () => {
  await axios
    .get("/vendor/dashboard")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default {
  getDashboardInfo,
};
