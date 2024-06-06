import Header from "../Shared/Header/Header";
import "./Profilepage.css";
import "../Homepage/Homepage.css";
import profilepage from "./Assets/profilepage.jpg";

function ImageProfilePage() {
  return (
    <div className="img-container-profilepage">
      <img src={profilepage} alt="shoes-photo"></img>
    </div>
  );
}

function OverviewProfilePage() {
  return (
    <>
      <div className="cal-button-flex-container">
        <div className="grid-container-goal-cal">
          <button type="button" className="goal-cal">
            <p className="number-cal">2450/2500</p>
            <p className="text-cal">Goal Calories </p>
          </button>
        </div>
        <div className="grid-container-cal-burnt">
          <button type="button" className="goal-cal">
            <p className="number-cal">450 kcal</p>
            <p className="text-cal">Burnt Calories </p>
          </button>
        </div>
        <div className="grid-container-cal-intake">
          <button type="button" className="goal-cal">
            <p className="number-cal">2800kcal</p>
            <p className="text-cal">Intake Calories </p>
          </button>
        </div>
      </div>
    </>
  );
}

function LoginButtonsProfilePage() {}

function LoginWorkoutProfilePageButton() {}

function LoginMealProfilePageButton() {}

function Profilepage() {
  return (
    <>
      <Header />
      <div className="grid-container-profilepage">
        <div className="left-grid-container-pp">
          <p> MY PROFILE</p>

          <ImageProfilePage />
          <OverviewProfilePage />
        </div>
        <div className="right-grid-container-pp"></div>

        {/*to write the 3 boxes */}
      </div>
    </>
  );
}

export default Profilepage;
