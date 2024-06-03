import React, { useState } from "react";
import "./LoginSignupPage.css";
import logo from "../Shared/logo_fit.png";

function LoginSignupPage({
  step,
  handleNext,
  handleSignup,
  handleLoginToSignup,
}) {
  return (
    <>
      <div className="signup-page-grid-container">
        <div className="left-grid-container">
          <div className="flexgrid-logo">
            <img className="logo" src={logo} alt="FITLETIC Logo" />
            <p>FITLETIC</p>
          </div>
          {step === 1 ? (
            <form className="login-data-container">
              <div>
                <p className="username-container">Username</p>
                <input className="text-field-info" type="text" />
              </div>
              <div className="password-container">
                <p className="username">Password</p>
                <input className="text-field-info" type="password" />
              </div>
              <button
                className="login-button"
                type="button"
                onClick={() => alert("Login was clicked")}
              >
                <p>Login</p>
              </button>
              <div className="no-account">
                <p>
                  Don't have an account?{" "}
                  <a href="#" onClick={handleLoginToSignup}>
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          ) : step === 2 ? (
            <form className="signup-data-container">
              <div className="username-container">
                <p className="username">Username</p>
                <input className="text-field-info" type="text" />
              </div>
              <div className="password-container">
                <p className="password">Password</p>
                <input className="text-field-info" type="password" />
              </div>
              <div className="confirm-password-container">
                <p className="confirm-password">Confirm Password</p>
                <input className="text-field-info" type="password" />
              </div>
              <button
                className="next-button"
                type="button"
                onClick={handleNext}
              >
                <p>Next</p>
              </button>
            </form>
          ) : (
            <form className="signup-data-container">
              <div>
                <p className="age">Age</p>
                <div className="age-number-field">
                  <input type="number" min="16" className="number-field-size" />
                </div>
              </div>
              <div>
                <p className="height">Height</p>
                <div className="height-number-field">
                  <input
                    type="number"
                    min="100"
                    className="number-field-size"
                  />
                </div>
              </div>
              <div>
                <p className="weight">Weight</p>
                <div className="weight-number-field">
                  <input type="number" min="30" className="number-field-size" />
                </div>
              </div>
              <div>
                <p className="activity-level">Activity Level</p>
                <div className="activity-level-select-field">
                  <select className="dropdown">
                    <option value="">Select</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="moderately-active">Moderately Active</option>
                    <option value="vigorously-active">Vigorously Active</option>
                    <option value="extremely-active">Extremely Active</option>
                    <option value="none">None of these</option>
                  </select>
                </div>
              </div>
              <div>
                <p className="goal">Goal</p>
                <div className="goal-select-field">
                  <select className="dropdown">
                    <option value="">Select</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="maintain-weight">Maintain Weight</option>
                    <option value="weight-gain">Weight Gain</option>
                    <option value="none">None of these</option>
                  </select>
                </div>
              </div>
              <button
                className="signup-button"
                type="button"
                onClick={handleSignup}
              >
                <p>Sign Up</p>
              </button>
            </form>
          )}
        </div>
        <div className="right-grid-container"></div>
      </div>
    </>
  );
}

function LoginSignupcontainer() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleSignup = () => {
    alert("Signup was clicked");
  };

  const handleLoginToSignup = () => {
    setStep(2);
  };

  return (
    <LoginSignupPage
      step={step}
      handleNext={handleNext}
      handleSignup={handleSignup}
      handleLoginToSignup={handleLoginToSignup}
    />
  );
}

export default LoginSignupcontainer;
