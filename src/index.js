import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import store from "./store/Store";
import App from "./App";
import "./index.css";
import i18n from "./i18n/i18n";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store()}>
      {/* <ConnectedRouter history={history}> */}
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </I18nextProvider>
      </ErrorBoundary>
      {/* </ConnectedRouter> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
