import Header from "../Shared/Header/Header";
import "./Profilepage.css";
import "../Homepage/Homepage.css";
import Footer, { FooterWaveDivider } from "../Shared/Footer/Footer";

function Profilepage() {
  return (
    <>
      <Header />
      <div className="flex-container-profilepage">
        {/*to write the 3 boxes */}
      </div>
      <div className="footer-profilepage">
        <FooterWaveDivider />
        <Footer />
      </div>
    </>
  );
}

export default Profilepage;
