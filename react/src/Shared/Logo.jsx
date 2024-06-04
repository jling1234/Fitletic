import "./Logo.css";
import logo from "./logo_fit.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="fitletic-logo-wrapper">
      <img src={logo} alt="fitletic logo" />
      <p>FITLETIC</p>
    </div>
  );
}

export function HomepageLinkLogo() {
  return (
    <Link to={"/"} className="fitletic-logo-wrapper">
      <img src={logo} alt="fitletic logo" />
      <p>FITLETIC</p>
    </Link>
  );
}
