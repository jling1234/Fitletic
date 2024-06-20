import Header from "../Shared/Header/Header";
import "./Profilepage.css";
import "../Homepage/Homepage.css";

import { useState, useEffect } from "react";

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
        <p>OVERVIEW</p>
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

//has BMI calculation in it
function UserProfileRectangleRight() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");

  useEffect(() => {
    if (height > 0 && weight > 0) {
      const bmi = (weight / (height * height)).toFixed(2);
      setBmi(bmi);
    } else {
      setBmi("");
    }
  });

  const disableScroll = (e) => {
    e.target.blur();
  };

  return (
    <>
      <div className="right-white-rectangle">
        <p>
          <div className="activity-lvl">
            Activity Level:<br></br> <input type="text" />
          </div>
          <div className="height-pp">
            Height(m):
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              onClick={(e) => e.preventDefault()}
              onWheel={disableScroll}
            ></input>
          </div>
          <div className="weight-pp">
            Weight(kg):<br></br>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onWheel={disableScroll}
            />
          </div>
          <div className="BMI-profile">
            <p>
              BMI: {""} 
               {bmi}
            </p>
            <br></br>
          </div>
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
  );
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
