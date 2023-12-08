import axios from "./base/axios";
import httpStatusCodes from "./base/httpStatusCodes";

const createItem = async (values, accessToken) => {
  let ID = 0;
  let config = {
    headers: {
      Authorization: accessToken,
      "Content-Type": "multipart/form-data",
    },
  };

  await axios
    .post("/items/create", values, config)
    .then(function (response) {
      ID = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const bid = async (values, accessToken) => {
  let success = false;
  let config = {
    headers: {
      Authorization: accessToken,
    },
  };

  await axios
    .post("/items/bid", values, config)
    .then(function (response) {
      success = true;
    })
    .catch(function (error) {
      console.log(error);

      if (error.response.status == httpStatusCodes.unauthorized) {
        // redirect to login...
      }
    });

  return success;
};

const getItems = async () => {
  const response = await axios.get("/items");
  return response.data;
};

const getItemsIdentity = async () => {
  const response = await axios.get("/items/identity");
  return response.data;
};

const getItemByID = async (id) => {
  const response = await axios.get(`/items/${id}`);
  return response.data;
};

export default {
  createItem,
  bid,
  getItems,
  getItemsIdentity,
  getItemByID,
};
