import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/index.scss";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter forceRefresh>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// ====================================
// reportWebVitals(console.log);
