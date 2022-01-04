import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import reportWebVitals from "./reportWebVitals";
import Routes from "./routes";
import esEs from "antd/es/locale/es_ES";
import { ConfigProvider } from "antd";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={esEs}>
      <Routes />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
