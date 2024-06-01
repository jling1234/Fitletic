import logo from "./logo fit.png";

import "./Signuppage.css";

function EmailAndPassword() {
  return (
    <>
      <div className="username-container">
        <p className="username">Username</p>
        <input className="text-field-info" type="text" />
      </div>
      <div className="password-container">
        <p className="password">Password</p>
        <input className="text-field-info" type="text" />
      </div>
    </>
  );
}

function SignupPage() {
  return (
    <>
      <div className="signup-page-grid-container">
        <div className="left-grid-container">
          <div className="flexgrid-logo">
            <img className="logo" src={logo}></img>
            <p>FITLETIC</p>
          </div>
          <form className="signup-data-container">

            <EmailAndPassword />

            <div className="confirm-password-container">
              <p className="confirm-password">Confirm Password</p>
              <input className="text-field-info" type="text" />
            </div>

            <button
              className="next-button"
              onClick={() => alert("next was clicked")}
            >
              {" "}
              <p>Next</p>{" "}
            </button>
          </form>

        </div>

        <div className="right-grid-container">
          
        </div>
      </div>
    </>
  );
}

export default SignupPage;