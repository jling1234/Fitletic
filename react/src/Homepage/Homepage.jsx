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

      <main>
        <section className="call-to-action-wrapper">
          <div className="call-to-action">
            <div className="call-to-action-text-wrapper">
              <h1>Your Gateway To Gains</h1>
              <p>
                Your ultimate destination for comprehensive support in both
                nutrition and workouts. Make every rep count and every movement
                matter. Embrace the grind, challenge your limits, and push
                yourself further.
              </p>
            </div>
            <div className="call-to-action-button-wrapper">
              <button type="button">Join Now</button>
              <button type="button">Login</button>
            </div>
          </div>

          <div className="call-to-action-rectangle-wrapper">
            <div className="rectangle-1"></div>
            <div className="rectangle-2"></div>
            <div className="rectangle-3"></div>
            <div className="rectangle-4"></div>
            <div className="rectangle-5"></div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Homepage;
