import React from "react";
import "./Login.css";
import logo from "./logo fit.png";

console.log(logo);

function Login() {
  return (
    <div className="grid-container">
      <div className="left">
        <div className="logo">
          <img src={logo}></img>
          <a className="home" href="#home">
            HOME
          </a>
        </div>
        <div>
          <p className="welcome"> WELCOME TO FITLETIC </p>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Login;
