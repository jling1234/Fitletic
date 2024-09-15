import FooterWithWaves  from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import "../MealsPage/MealsPage.css";
import {Link, useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {getUserInfo} from "../Shared/API/Auth.js";
import {useEffect} from "react";

export function MakeNewRecipeButton() {
  return (
    <>
      <Link to={"/mealslogin"}>
        <button type="button" className="make-a-new-recipe-button">
          <p>Make A New Recipe</p>
        </button>
      </Link>
    </>
  );
}

function Mealspage() {
  const navigate = useNavigate();

  const { data: userInfo, isLoading: userInfoIsLoading } = useQuery("userInfo", getUserInfo);

  useEffect(() => {
    if (!userInfoIsLoading && !userInfo) {
      navigate("/login", { replace: true });
    }
  }, [navigate, userInfo, userInfoIsLoading]);

  return (
    <>
      <Header />
      <div className="toppage-container-mp">
        <div className="mealspage-image-container">
          <div className="accessories-container-mp">
            <div className="meals-label">
              <p>MEALS</p>
            </div>
          <div className="KcalGained-tracker-and-mealslog">
              <div className="KcalGained-tracker">
                <h1>2000  KCAL </h1>
                <h6> Gained from Meals</h6>
                
              </div>
              <div className="Mealslog">
                <button
                  type="button"
                  onClick={() => alert("You have logged in a Meal.")}
                >
                  <p>Log a Meal</p>
                </button>
              </div>
            </div>
          </div>
      </div>
      </div>

      <div className="bottompage-container-mp">
        <div className="my-meals-heading">
          <p>MY MEALS</p>
        </div>
        <div className="saved-meals-flex-container">
          <button type="button" className="saved-meals"></button>
          <button type="button" className="saved-meals"></button>
          <button type="button" className="saved-meals"></button>
          <button type="button" className="saved-meals"></button>
          <button type="button" className="saved-meals"></button>
          <button type="button" className="saved-meals"></button>
        </div>
        <div className="make-a-new-recipe-container">
          <MakeNewRecipeButton />
      </div>
      </div>

      <FooterWithWaves />
    </>
  );
}

export default Mealspage;
