import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { HomepageLinkLogo } from "../Logo/Logo.jsx";

import "./Header.css";
import PropTypes from "prop-types";

export default function Header({ headerRef }) {
  const opacityFillStart = 0;
  const opacityFillStop = 400;

  const backgroundRef = useRef(null);
  const navRef = useRef(null);

  const updateBackgroundOpacity = () => {
    const scrollPosition = window.scrollY;

    let opacity = (scrollPosition - opacityFillStart) / opacityFillStop;
    if (opacity < 0) opacity = 0;
    else if (opacity > 1) opacity = 1;

    backgroundRef.current.style.opacity = opacity;
  };

  const toggleMenu = () => {
    navRef.current.classList.toggle("header-nav-open");
  };

  useLayoutEffect(() => {
    updateBackgroundOpacity();
    window.addEventListener("scroll", updateBackgroundOpacity);

    return () => window.removeEventListener("scroll", updateBackgroundOpacity);
  }, []);

  return (
    <header ref={headerRef} className="header">
      <div ref={backgroundRef} className="header-background"></div>
      <div className="header-content">
        <HomepageLinkLogo></HomepageLinkLogo>
        <button onClick={toggleMenu}>≡</button>
        <nav ref={navRef}>
          <ul>
            <li>
              <Link to={"/"}>HOME</Link>
            </li>
            <li>
              <Link to={"/profile"}>PROFILE</Link>
            </li>
            <li>
              <Link to={"/workout"}>WORKOUTS</Link>
            </li>
            <li>
              <Link to={"/meals"}>MEALS</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  headerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};