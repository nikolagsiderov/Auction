import getConfig from "next/config";
import { useRouter } from "next/router";
import { merge } from "merge";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import customThemeOptions from "./themeOptions";
import { useEffect } from "react";
import cookies from "js-cookie";
import { useDispatch } from "react-redux";
import api from "../../../shared/api/authentication";

const MuiTheme = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshTokenCookie = cookies.get("auth_jwt_refresh_token");

    if (refreshTokenCookie) {
      async () => await api.renew(dispatch, refreshTokenCookie);
    }
  }, []);

  const { pathname } = useRouter();
  const { publicRuntimeConfig } = getConfig(); // from next.config.js

  const themeOptions = customThemeOptions(publicRuntimeConfig, pathname);
  let theme = createTheme(
    merge(
      {},
      {
        ...themeOptions,
        direction: "ltr",
      }
    )
  );
  theme = responsiveFontSizes(theme);

  theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)";
  theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)";
  theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)";
  theme.shadows[4] = "0px 0px 28px rgba(3, 0, 71, 0.01)";
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default MuiTheme;
