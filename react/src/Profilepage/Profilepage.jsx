import Header from "../Shared/Header/Header";
import "./Profilepage.css";
import "../Homepage/Homepage.css";
import { func } from "prop-types";

function ImageProfilePage() {
  return (
    <>
      <div className="img-profilepage">
        <div className="img-text">
          Hello,<br></br>
          Username
        </div>
      </div>

    </>
  );
}

function OverviewProfilePage() {
  return (
    <>
      <div className="overview-text">
        <p>
          OVERVIEW
        </p>
      </div>
      <div className="cal-values-flex-container">
        <div className="cal-values">
          <p className="number-cal">450 Kcal</p>

          <p className="text-cal">Burnt Calories</p>
        </div>
        <div className="cal-values">
          <p className="number-cal">2800 Kcal</p>
          <p className="text-cal">Intake Calories</p>
        </div>
      </div>
    </>
  );
}

function RingTracker() {
  return (
    <div className="circle">
      <p className="number-cal">2450/2500</p>
      <p className="text-cal">Goal Calories</p>
    </div>
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
function UserProfileRectangleLeft() {
  return (
    <>
      <div className="left-white-rectangle">
        <p>
          Username: <br></br>
          Age:<br></br>
          Gender:<br></br>
          Goal:
        </p>
      </div>
      <div>
        <button
          type=" button"
          className="button-small-profilepage"
          onClick={() => alert("save changes was clicked ")}
        >
          <p> Save Changes</p>
        </button>
      </div>
    </>
  );
}

function UserProfileRectangleRight() {
  return (
    <><div className="right-white-rectangle">
      <p>
        Activity Level:<br></br>
        Height:<br></br>
        Weight:<br></br>
        BMI:<br></br>
      </p>
    </div>
      <div>
        <button
          type=" button"
          className="button-small-profilepage"
          onClick={() => alert("log out was clicked ")}
        >
          <p> Log Out</p>
        </button>
      </div>

    </>

  )
}


function Profilepage() {
  return (
    <>
      <Header />
      <div className="biggest-container">
        <div className="grid-container-profilepage">
          <div className="left-grid-container-pp-12">
            <ImageProfilePage />
          </div>
          <div className="top-grid-container-pp-1">
            <RingTracker />
          </div>
          <div className="top-grid-container-pp-2">
            <OverviewProfilePage />
            <LoginButtonsProfilePage />
          </div>
          <div className="bottom-grid-container-pp-1">
            <UserProfileRectangleLeft />
          </div>
          <div className="bottom-grid-container-pp-2">
            <UserProfileRectangleRight />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profilepage;
