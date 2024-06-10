import Header from "../Shared/Header/Header";
import "./Profilepage.css";
import "../Homepage/Homepage.css";
import { func } from "prop-types";

function ImageProfilePage() {
  return (
    <>
      
        <div className="img-container-profilepage">
        <div className="img-overlay">
          <p>
            Hello, <br></br>Username
          </p>
        </div>
      </div>
    </>
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

function LoginButtonsProfilePage() {
  return (
    <div className="login-buttons-profilepage">
      <LoginWorkoutProfilePageButton />
      <LoginMealProfilePageButton />
    </div>
  );
}

function LoginWorkoutProfilePageButton() {
  return (
    <div>
      <button
        type=" button"
        className="button-profilepage"
        onClick={() => alert("login a workout was clicked ")}
      >
        <p> Login a Workout</p>
      </button>
    </div>
  );
}

function LoginMealProfilePageButton() {
  return (
    <div>
      <button
        type=" button"
        className="button-profilepage"
        onClick={() => alert("login a meal was clicked ")}
      >
        <p> Login a Meal</p>
      </button>
    </div>
  );
}

function Profilepage() {
  return (
    <>
      <Header />
      <div className="grid-container-profilepage">
        <div className="left-grid-container-pp">
          <p> MY PROFILE</p>

          <ImageProfilePage />
          <OverviewProfilePage />
          <LoginButtonsProfilePage />
        </div>
        <div className="right-grid-container-pp"></div>
      </div>
    </>
  );
}

export default Profilepage;
