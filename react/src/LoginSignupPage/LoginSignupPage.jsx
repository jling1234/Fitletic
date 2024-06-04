import { useState } from "react";
import * as PropTypes from "prop-types";

import "./LoginSignupPage.css";
import logo from "../Shared/logo_fit.png";
import { Link } from "react-router-dom";
import { HomepageLinkLogo } from "../Shared/Logo/Logo.jsx";

function LoginForm() {
  const onLoginButtonClick = () => alert("Login was clicked");

  return (
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
        onClick={onLoginButtonClick}
      >
        <p>Login</p>
      </button>
      <div className="no-account">
        <p>
          Don&apos;t have an account? <Link to={"/signup"}>Sign Up</Link>
        </p>
      </div>
    </form>
  );
}

function SignUpForm1({ onNextClick }) {
  return (
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
      <button className="next-button" type="button" onClick={onNextClick}>
        <p>Next</p>
      </button>
    </form>
  );
}

SignUpForm1.propTypes = { onNextClick: PropTypes.func };

function SignUpForm2() {
  const handleSignup = () => {
    alert("Signup was clicked");
  };

  return (
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
          <input type="number" min="100" className="number-field-size" />
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
      <button className="signup-button" type="button" onClick={handleSignup}>
        <p>Sign Up</p>
      </button>
    </form>
  );
}

function LoginSignupPage({ step, handleNext }) {
  return (
    <>
      <div className="signup-page-grid-container">
        <div className="left-grid-container">
          <HomepageLinkLogo></HomepageLinkLogo>
          {step === 1 ? (
            <LoginForm />
          ) : step === 2 ? (
            <SignUpForm1 onNextClick={handleNext} />
          ) : (
            <SignUpForm2 />
          )}
        </div>
        <div className="right-grid-container"></div>
      </div>
    </>
  );
}

LoginSignupPage.propTypes = {
  step: PropTypes.number,
  handleNext: PropTypes.func,
  handleLoginToSignup: PropTypes.func,
};

export function LoginPage() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return <LoginSignupPage step={step} handleNext={handleNext} />;
}

export function SignUpPage() {
  const [step, setStep] = useState(2);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return <LoginSignupPage step={step} handleNext={handleNext} />;
}
