import "./Homepage.css";
import logo from "../Shared/logo_fit.png";
import { useId } from "react";

function Header() {
  return (
    <header className="header">
      <div className="logo-wrapper">
        <img src={logo} alt="fitletic logo" />
        <p>FITLETIC</p>
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

function HomepageContent() {
  return (
    <section className="homepage-content">
      <div className="homepage-content-intro">
        <h1>Healthy Living Made Easy</h1>
        <p>
          Explore our calibrated workout and meal calorie trackers, make your
          own routines and recipes, and start your journey to a healthier,
          fitter you!
        </p>
      </div>

      <div className="homepage-gallery">
        <button type="button" className="workouts-button">
          <div className="button-text">WORKOUTS</div>
          <div className="button-background"></div>
        </button>
        <button type="button" className="routines-button">
          <div className="button-text">SAVED ROUTINES</div>
          <div className="button-background"></div>
        </button>
        <button type="button" className="recipes-button">
          <div className="button-text">SAVED RECIPES</div>
          <div className="button-background"></div>
        </button>
        <button type="button" className="meals-button">
          <div className="button-text">MEALS</div>
          <div className="button-background"></div>
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="logo-wrapper">
        <img src={logo} alt="fitletic logo" />
        <p>FITLETIC</p>
      </div>

      <ul className="footer-links">
        <li>
          <a href="">FAQ</a>
        </li>
        <li>
          <a href="">Our Mission</a>
        </li>
        <li>
          <a href="">About Us</a>
        </li>
        <li>
          <a href="">Contact Us</a>
        </li>
      </ul>
    </footer>
  );
}

function WaveDivider({
  flip = false,
  colors = ["black"],
  gradientRotate = 0,
  height = "100px",
}) {
  const style = {
    "--wave-rotate": flip ? "0deg" : "180deg",
    "--wave-height": height,
  };

  const gradientID = useId();

  // Gradient with same start and end
  if (colors.length === 1) {
    colors.push(colors[0]);
  }

  const defs = (
    <defs>
      <linearGradient
        id={gradientID}
        gradientTransform={"rotate(" + gradientRotate + ")"}
      >
        {colors.map((color, i, array) => (
          <stop
            key={i}
            stopColor={color}
            offset={(i / (array.length - 1)) * 100 + "%"}
          ></stop>
        ))}
      </linearGradient>
    </defs>
  );

  return (
    <div className="custom-shape-divider-wrapper" style={style}>
      <div className="custom-shape-divider">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {defs}
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill={"url(#" + gradientID + ")"}
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill={"url(#" + gradientID + ")"}
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill={"url(#" + gradientID + ")"}
          ></path>
        </svg>
      </div>
    </div>
  );
}

function Homepage() {
  return (
    <div className="homepage">
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

        <WaveDivider
          flip={true}
          colors={["#5d987a", "#2c4739", "#1f3229"]}
        ></WaveDivider>

        <HomepageContent></HomepageContent>

        <WaveDivider colors={["#a4cbb7"]}></WaveDivider>

        <Footer></Footer>
      </main>
    </div>
  );
}

export default Homepage;
