import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import App from "./App";
import { Provider } from "react-redux";
import { AccountProvider } from "./context/AccountContext";

const el = document.getElementById("root");
const root = createRoot(el);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AccountProvider>
        <App />
      </AccountProvider>
    </BrowserRouter>
  </Provider>
);
