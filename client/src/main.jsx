import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer/>
    </BrowserRouter>
  </Provider>
);
