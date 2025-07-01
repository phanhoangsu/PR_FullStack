// 📁 src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { store } from "./reduxToolKist/Store";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css"; // cho Ant Design v5+
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // cần để collapse hoạt động

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
