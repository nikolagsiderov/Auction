import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jwt-decode";
import cookies from "js-cookie";
import api from "../../../shared/api/authentication";
import { useSelector, useDispatch } from "react-redux";

function Authenticate({ children }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.value);

  useEffect(() => {
    // on initial load - run auth check
    accessOrRedirect(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthenticated(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", accessOrRedirect);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", accessOrRedirect);
    };
  }, []);

  function accessOrRedirect(url) {
    const publicPaths = ["/login"];
    const currentPath = url.split("?")[0];
    const refreshTokenCookie = cookies.get("auth_jwt_refresh_token");

    if (publicPaths.includes(currentPath) === false) {
      if (accessToken && jwt(accessToken).exp * 1000 > Date.now()) {
        // access token is valid
        setAuthenticated(true);
      } else {
        // access token is invalid
        // try refreshing it...
        if (refreshTokenCookie) {
          setAuthenticated(
            async () => await api.renew(dispatch, refreshTokenCookie)
          );
        } else {
          router.push({
            pathname: "/login",
            query: { returnUrl: router.asPath },
          });
        }
      }
    } else {
      setAuthenticated(true);
    }
  }

  return authenticated && children;
}

export default Authenticate;
