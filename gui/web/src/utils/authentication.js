import jwt from "jwt-decode";
import cookies from "js-cookie";
import api from "../../../shared/api/authentication";

function isAuthenticated(accessToken, dispatch) {
  const refreshTokenCookie = cookies.get("auth_jwt_refresh_token");

  if (accessToken && jwt(accessToken).exp * 1000 > Date.now()) {
    // access token is valid
    return true;
  } else {
    // access token is invalid
    // try refreshing it...
    if (refreshTokenCookie) {
      let value = async () => await api.renew(dispatch, refreshTokenCookie);
      return value;
    } else {
      return false;
    }
  }
}

export { isAuthenticated };
