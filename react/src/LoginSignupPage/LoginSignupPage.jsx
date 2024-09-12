import { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
//import http from "../http-common";
import { json, useNavigate } from "react-router-dom";

import "./LoginSignupPage.css";
import { Link } from "react-router-dom";
import { HomepageLinkLogo } from "../Shared/Logo/Logo.jsx";
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/signin", {
        username: username,
        password: password,
        active: true,
      });
      console.log(response.status);

      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="login-data-container" onSubmit={onLoginSubmit}>
      <div>
        <p className="username-container">Username</p>
        <input
          className="text-field-info"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="password-container">
        <p className="username">Password</p>
        <input
          className="text-field-info"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="login-button" type="submit">
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

export default LoginForm;

function SignUpForm1({ onNextClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSignUpSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register", {
        username: username,
        password: password,
        active: true,
      });
      console.log(response.status);

      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form className="signup-data-container" onSubmit={onSignUpSubmit}>
      <div className="username-container">
        <p className="username">Username</p>
        <input
          className="text-field-info"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="password-container">
        <p className="password">Password</p>
        <input
          className="text-field-info"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="confirm-password-container">
        <p className="confirm-password">Confirm Password</p>
        <input
          className="text-field-info"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
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
  const [age, setAge] = useState(localStorage.getItem("age") || "");
  const [height, setHeight] = useState(localStorage.getItem("height") || "");
  const [weight, setWeight] = useState(localStorage.getItem("weight") || "");
  const [activityLevel, setActivityLevel] = useState(
    localStorage.getItem("activityLevel") || ""
  );
  const [goal, setGoal] = useState(localStorage.getItem("goal") || "");

  useEffect(() => {
    localStorage.setItem("age", JSON.stringify(age));
    localStorage.setItem("height", JSON.stringify(height));
    localStorage.setItem("weight", JSON.stringify(weight));
    localStorage.setItem("activityLevel", JSON.stringify(activityLevel));
    localStorage.setItem("goal", JSON.stringify(goal));
  }, [age, height, weight, activityLevel, goal]);

  return (
    <form className="signup-data-container">
      <div>
        <p className="age">Age</p>
        <div className="age-number-field">
          <input
            type="number"
            min="16"
            className="number-field-size"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>
      <div>
        <p className="height">Height</p>
        <div className="height-number-field">
          <input
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            min="100"
            className="number-field-size"
          />
        </div>
      </div>
      <div>
        <p className="weight">Weight</p>
        <div className="weight-number-field">
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            min="30"
            className="number-field-size"
          />
        </div>
      </div>
      <div>
        <p className="activity-level">Activity Level</p>
        <div className="activity-level-select-field">
          <select
            className="dropdown"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          >
            <option value="">Select</option>
            <option value="sedentary">Sedentary</option>
            <option value="moderately-active">Moderately Active</option>
            <option value="vigorously-active">Vigorously Active</option>
            <option value="extremely-active">Extremely Active</option>
          </select>
        </div>
      </div>
      <div>
        <p className="goal">Goal</p>
        <div className="goal-select-field">
          <select
            className="dropdown"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="">Select</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="maintain-weight">Maintain Weight</option>
            <option value="weight-gain">Weight Gain</option>
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
