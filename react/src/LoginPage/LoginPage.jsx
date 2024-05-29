import React from "react";
import "./LoginPage.css";
import logo from "./logo fit.png";

console.log(logo);

export function EmailAndPassword() {
  return (
    <>
      <div>
        <p className="email"> E-Mail </p>
        <div className="email-text-field">
          <input type="text" className="email-text-field-size" size="50" />
        </div>
      </div>
      <div>
        <p className="password">Password</p>
        <div className="password-text-field">
          <input type="text" className="password-text-field-size" size="50" />
        </div>
      </div>
    </>
  );
}

function LoginPage() {
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

        <EmailAndPassword />

        <div className="login-button">
          <button
            className="login-button-size"
            onClick={() => alert("Logging in")}
          >
            <p className="login-font">LOGIN</p>
          </button>
        </div>

        <div className="flex-container">
          <p className="no-account-text"> Don't have an account? </p>

          <button
            className="sign-up-button"
            onClick={() => alert("To the sign up page")}
          >
            <p className="sign-up-font">SIGN UP</p>
          </button>
        </div>
      </div>
      <div className="right">
        <div className="the-catchphrase">
          <p className="the-catchphrase-font">
            Your Fitness Journey Awaits You.
          </p>
        </div>
        <div className="the-line-in-small">
          <p className="the-line-in-small-font">
            Embark on a transformative fitness journey with us, where you are in
            charge of every step and every meal to reach your health and
            wellness goals.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
