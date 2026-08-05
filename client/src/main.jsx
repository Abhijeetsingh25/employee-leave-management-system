import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";

import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
        <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </BrowserRouter>
  </Provider>
);