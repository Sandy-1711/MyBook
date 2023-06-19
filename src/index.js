import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AuthProvider } from "./context/AuthContext";
import './styles.css'
ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>
    , document.getElementById("root"));