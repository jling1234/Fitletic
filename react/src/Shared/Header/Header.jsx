import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { HomepageLinkLogo } from "../Logo/Logo.jsx";

import "./Header.css";

export default function Header() {
  const opacityFillStart = 0;
  const opacityFillStop = 400;

  const backgroundRef = useRef(null);
  const updateBackgroundOpacity = () => {
    const scrollPosition = window.scrollY;

    let opacity = (scrollPosition - opacityFillStart) / opacityFillStop;
    if (opacity < 0) opacity = 0;
    else if (opacity > 1) opacity = 1;

    backgroundRef.current.style.opacity = opacity;
  };

  useLayoutEffect(() => {
    updateBackgroundOpacity();
    window.addEventListener("scroll", updateBackgroundOpacity);
    return () => window.removeEventListener("scroll", updateBackgroundOpacity);
  }, []);

  return (
    <header className="header">
      <div ref={backgroundRef} className="header-background"></div>
      <div className="header-content">
        <HomepageLinkLogo></HomepageLinkLogo>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>HOME</Link>
            </li>
            <li>
              <Link to={"/profile"}>PROFILE</Link>
            </li>
            <li>
              <Link to={"/"}>WORKOUTS</Link>
            </li>
            <li>
              <Link to={"/"}>MEALS</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
