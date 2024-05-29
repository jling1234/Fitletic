import "./Homepage.css";
import logo from "../Shared/logo_fit.png";

function Header() {
  return (
    <header className="header">
      <div className="logo-wrapper">
        <img src={logo} alt="fitletic logo" />
      </div>

      <nav>
        <ul>
          <li>
            <a href="">HOME</a>
          </li>
          <li>
            <a href="">PROFILE</a>
          </li>
          <li>
            <a href="">WORKOUTS</a>
          </li>
          <li>
            <a href="">MEALS</a>
          </li>
          <li>
            <a href="">ABOUT US</a>
          </li>
        </ul>
      </nav>

      <div className="user-wrapper">
        <p className="username">USERNAME</p>
        <div className="user-image"></div>
      </div>
    </header>
  );
}

function Homepage() {
  return (
    <>
      <Header></Header>
    </>
  );
}

export default Homepage;
