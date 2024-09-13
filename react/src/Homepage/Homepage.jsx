import { Link } from "react-router-dom";

import Header from "../Shared/Header/Header.jsx";
import FooterWithWaves from "../Shared/Footer/Footer.jsx";

import "./Homepage.css";
import {getUserInfo} from "../Shared/API/Auth.js";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {setToken} from "../Shared/LocalDetails/LocalDetails.jsx";

function BannerText() {
  const text = "FITLETIC";
  const repeat = 15;
  const rows = 3;

  const rowDivs = [];

  for (let i = 0; i < rows; i++) {
    const textItems = [];

    for (let j = 0; j < repeat; j++) {
      const isColored = (i * repeat + j) % 2 === 0;

      textItems.push(
        <span key={j} className={isColored ? "accent-text" : ""}>
          {text + " "}
        </span>,
      );
    }
    rowDivs.push(
      <div key={i} className="homepage-banner-text">
        {textItems}
      </div>,
    );
  }

  return <div className="homepage-banner-text-wrapper">{rowDivs}</div>;
}

function Banner() {
  return (
    <div className="homepage-banner">
      <BannerText></BannerText>
    </div>
  );
}

function HomepageContent() {
  return (
    <section className="homepage-content">
      <div className="homepage-content-intro">
        <h1>
          YOUR <span className="accent-text">GATEWAY</span> TO{" "}
          <span className="accent-text">GAINS</span>
        </h1>
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

function LoginSignupButtonWrapper() {
  const queryClient = useQueryClient();

  const {
    data: userInfo,
  } = useQuery("userInfo", getUserInfo);

  const handleLogout = () => {
    setToken("");
    queryClient.invalidateQueries();
  }

  if (userInfo) {
    return <div className="homepage-button-wrapper">
      <Link to={"/"}>Profile</Link>
      <button type={"button"} onClick={handleLogout}>Logout</button>
    </div>
  }
  
  return (
    <div className="homepage-button-wrapper">
      <Link to={"/login"}>Login</Link>
      <Link to={"/signup"}>Join Now</Link>
    </div>
  );
}

function Homepage() {
  return (
    <div className="homepage">
      <Header></Header>
      <main>
        <Banner></Banner>
        <LoginSignupButtonWrapper></LoginSignupButtonWrapper>
        <HomepageContent></HomepageContent>
        <FooterWithWaves></FooterWithWaves>
      </main>
    </div>
  );
}

export default Homepage;
