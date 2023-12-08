import axios from "./base/axios";
import httpStatusCodes from "./base/httpStatusCodes";

const createCategory = async (values, accessToken) => {
  let success = false;
  let config = {
    headers: {
      Authorization: accessToken,
    },
  };

  await axios
    .post("/categories/create", values, config)
    .then(function (response) {
      success = true;
    })
    .catch(function (error) {
      console.log(error);
    });

  return success;
};

const getCategories = async () => {
  const response = await axios.get("/categories");
  return response.data;
};

const getCategoriesIdentity = async () => {
  const response = await axios.get("/categories/identity");
  return response.data;
};

const getCategoryByID = async (id) => {
  const response = await axios.get(`/category/${id}`);
  return response.data;
};

export default {
  createCategory,
  getCategories,
  getCategoriesIdentity,
  getCategoryByID,
};
