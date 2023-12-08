import { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import MuiTheme from "theme/MuiTheme";
import "nprogress/nprogress.css";
import "simplebar/dist/simplebar.min.css";
import { store } from "../../shared/context/store";
import { Provider } from "react-redux";

//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

// Refer to: https://stackoverflow.com/questions/10888610/ignore-invalid-self-signed-ssl-certificate-in-node-js-with-https-request
// This is a temporary solution
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// small change
nProgress.configure({
  showSpinner: false,
});
const App = ({ Component, pageProps }) => {
  const [renderPage, setRenderPage] = useState(false);

  useEffect(() => {
    setRenderPage(true);
  }, []);

  const AnyComponent = Component;
  const getLayout = AnyComponent.getLayout ?? ((page) => page);
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="React Next.js ecommerce template. Build SEO friendly Online store, delivery app and Multivendor store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta property="og:url" content="https://test.com" />
        {/* thumbnail And title for social media */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Pazarcheto - React Ecommerce Template"
        />
        <meta
          property="og:description"
          content="React Next.js ecommerce template. Build SEO friendly Online store, delivery app and Multivendor store"
        />
        <title>Благотворителен аукцион</title>
      </Head>

      <Provider store={store}>
        <MuiTheme>
          {renderPage ? (
            getLayout(<AnyComponent {...pageProps} />)
          ) : (
            <span>Loading...</span>
          )}
        </MuiTheme>
      </Provider>
    </Fragment>
  );
};

export default App;
