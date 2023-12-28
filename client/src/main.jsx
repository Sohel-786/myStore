import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import { ContextProvider } from "./Context/BagContext.jsx";
import { WishlistContextProvider } from "./Context/WishListContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <WishlistContextProvider>
        <ContextProvider>
          <App />
          <ToastContainer />
        </ContextProvider>
      </WishlistContextProvider>
    </BrowserRouter>
  </Provider>
);
