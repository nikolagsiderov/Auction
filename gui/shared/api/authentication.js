import axios from "./base/axios";
import cookies from "js-cookie";
import jwt from "jwt-decode";
import { set } from "../context/features/accessTokenSlice";

export const signUp = async (dispatch, values) => {
  let success = false;
  await axios
    .post("/authentication/signup", values)
    .then(function (response) {
      const decoded = jwt(response.data.refreshToken);

      cookies.set("auth_jwt_refresh_token", response.data.refreshToken, {
        expires: new Date(decoded.exp * 1000),
      });

      dispatch(set(response.data.accessToken));
      success = true;
    })
    .catch(function (error) {
      console.log(error);
    });

  return success;
};

export const authenticate = async (dispatch, values) => {
  let success = false;

  await axios
    .post("/authentication/authenticate", values)
    .then(function (response) {
      // Set refresh token in cookie
      const decoded = jwt(response.data.refreshToken);
      cookies.set("auth_jwt_refresh_token", response.data.refreshToken, {
        expires: new Date(decoded.exp * 1000),
      });

      dispatch(set(response.data.accessToken));
      success = true;
    })
    .catch(function (error) {
      console.log(error);
    });

  return success;
};

export const renew = async (dispatch, refreshToken) => {
  let success = false;

  await axios
    .post("/authentication/renew", { value: refreshToken })
    .then(function (response) {
      // Set refresh token in cookie
      const decoded = jwt(response.data.refreshToken);
      cookies.set("auth_jwt_refresh_token", response.data.refreshToken, {
        expires: new Date(decoded.exp * 1000),
      });

      dispatch(set(response.data.accessToken));
      success = true;
    })
    .catch(function (error) {
      console.log(error);
      cookies.remove("auth_jwt_refresh_token");
    });

  return success;
};

export default {
  signUp,
  authenticate,
  renew,
};
