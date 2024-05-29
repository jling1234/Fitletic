import "./Login.css";
import logo from "../Shared/logo_fit.png";

function Login() {
  return (
    <div className="grid-container">
      <div className="left">
        <div className="logo">
          <img src={logo} alt="fitletic logo"></img>
          <a className="home">HOME</a>
        </div>
        <div>
          <p className="welcome"> WELCOME TO FITLETIC</p>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Login;
