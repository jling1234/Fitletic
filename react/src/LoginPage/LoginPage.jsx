import logo from "../SignUpPage/logo fit.png";
import "./LoginPage.css";

export function EmailAndPassword() {
  return (
    <>
      <div>
        <p className="username">Username</p>
        <input className="text-field-login" type="text" />
      </div>
      <div className="password-container">
        <p className="username">Password</p>
        <input className="text-field-login" type="text" />
      </div>
    </>
  );
}

function LoginPage() {
  return (
    <>
      <div className="login-page-grid-container">
        <div className="left-grid-container">
          <div className="flex-grid-for-logo-and-logoname">
            <img className="logo" src={logo}></img>
            <p>FITLETIC</p>
          </div>
          <form className="username-password-login-container">
            <EmailAndPassword />
            <button
              className="login-button"
              onClick={() => alert("login was clicked")}
            >
              {" "}
              <p>Login</p>{" "}
            </button>
          </form>

          <div className="no-account">
            <p>
              Don't have an account?{" "}
              <a href="" onClick={() => alert("Sign up was clicked ")}>
                Sign Up
              </a>
            </p>
          </div>
        </div>

        <div className="right-grid-container-signup-page"></div>
      </div>
    </>
  );
}
export default LoginPage;
