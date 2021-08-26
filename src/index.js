import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import store from "./store/Store";
import App from "./App";
import axios from "axios";
import "./index.css";
import i18n from "./i18n/i18n";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-datepicker/dist/react-datepicker.css";
import "font-awesome/css/font-awesome.min.css";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Token");
    config.headers.authorization = `${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store()}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </I18nextProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
