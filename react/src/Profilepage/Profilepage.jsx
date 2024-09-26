import Header from "../Shared/Header/Header";
import "./Profilepage.css";
import "../Homepage/Homepage.css";

import { useState, useEffect } from "react";
import { number } from "prop-types";
import { useQuery } from "react-query";
import { getLoggedWorkoutResponses } from "../Shared/API/Workout";
import { getLoggedMealsToday } from "../Shared/API/Meals";
import { getLoggedCalories } from "../Shared/API/Meals";

function ImageProfilePage() {
  const username = "Fitletic";
  return (
    <>
      <div className="img-profilepage">
        <div className="img-text">
          Hello,
          <br />
          {username}
        </div>
      </div>
    </>
  );
}

function OverviewProfilePage() {
  const { data: calories } = useQuery("calories", getLoggedWorkoutResponses);
  const totalCalories = calories
    ? calories.reduce((sum, workout) => sum + workout.calories, 0)
    : 0;

  const { data: loggedMeals } = useQuery("loggedMeals", getLoggedMealsToday);

  let intakeCalories = 0;
  if (loggedMeals) {
    for (const loggedMeal of loggedMeals) {
      intakeCalories += getLoggedCalories(loggedMeal);
    }
  }
  return (
    <>
      <div className="overview-text">
        <p>OVERVIEW</p>
      </div>
      <div className="cal-values-flex-container">
        <div className="cal-values">
          <p className="number-cal">{totalCalories} Kcal</p>
          <p className="text-cal">Burnt Calories</p>
        </div>
        <div className="cal-values">
          <p className="number-cal">{intakeCalories} Kcal</p>
          <p className="text-cal">Intake Calories</p>
        </div>
      </div>
    </>
  );
}

function RingTracker({ consumed, target }) {
  const radius = 135;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (consumed / target) * circumference;

  return (
    <div className="ring-container">
      <svg className="ring-svg" height={radius * 2} width={radius * 2}>
        {/* Background Circle*/}
        <circle
          stroke="#fb5d35"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ normalizedRadius }}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>
      <div className="ring-label">{consumed}/2500</div>
      <p className="ring-tracker-goal-calories">Goal Calories</p>
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
        type="button"
        className="button-profilepage"
        onClick={() => alert("login a workout was clicked ")}
      >
        <p>Login a Workout</p>
      </button>
    </div>
  );
}

function LoginMealProfilePageButton() {
  return (
    <div>
      <button
        type="button"
        className="button-profilepage"
        onClick={() => alert("login a meal was clicked ")}
      >
        <p>Login a Meal</p>
      </button>
    </div>
  );
}

function UserProfileRectangleLeft() {
  return (
    <>
      <div className="left-white-rectangle">
        <div className="input-fields">
          <label>
            <div className="username-pp">
              Username:
              <input type="text" />
            </div>
          </label>
        </div>
        <div className="input-fields">
          <label>
            <div className="age-pp">
              Age:
              <input type="number" />
            </div>
          </label>
        </div>
        <div className="input-fields">
          <label>
            <div className="gender-pp">
              Gender:
              <input type="text" />
            </div>
          </label>
        </div>
        <div className="input-fields">
          <label>
            <div className="goal-pp">
              Goal:
              <input type="text" />
            </div>
          </label>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="button-small-profilepage"
          onClick={() => alert("save changes was clicked")}
        >
          <p>Save Changes</p>
        </button>
      </div>
    </>
  );
}

function UserProfileRectangleRight() {
  const [activityLevel, setActivityLevel] = useState("");
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
  }, [height, weight]);

  const disableScroll = (e) => {
    e.target.blur();
  };

  return (
    <>
      <div className="right-white-rectangle">
        <div className="activity-lvl">
          Activity Level:
          <div className="input-fields">
            <input
              type="text"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            />
          </div>
        </div>
        <div className="height-pp">
          Height(m):
          <div className="input-fields">
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              onClick={(e) => e.preventDefault()}
              onWheel={disableScroll}
            />
          </div>
        </div>
        <div className="weight-pp">
          Weight(kg):
          <div className="input-fields">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onWheel={disableScroll}
            />
          </div>
        </div>
        <div className="BMI-profile">
          BMI:
          <div className="input-fields">
            <input type="number" value={bmi} readOnly />
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="button-small-profilepage"
          onClick={() => alert("log out was clicked")}
        >
          <p>Log Out</p>
        </button>
      </div>
    </>
  );
}

function Profilepage() {
  const { data: calories } = useQuery("calories", getLoggedWorkoutResponses);
  const totalCalories = calories
    ? calories.reduce((sum, workout) => sum + workout.calories, 0)
    : 0;

  const { data: loggedMeals } = useQuery("loggedMeals", getLoggedMealsToday);

  let intakeCalories = 0;
  if (loggedMeals) {
    for (const loggedMeal of loggedMeals) {
      intakeCalories += getLoggedCalories(loggedMeal);
    }
  }
  return (
    <>
      <Header />
      <div className="biggest-container">
        <div className="grid-container-profilepage">
          <div className="left-grid-container-pp-12">
            <ImageProfilePage />
          </div>
          <div className="top-grid-container-pp-1">
            <RingTracker
              consumed={(intakeCalories - totalCalories).toFixed(2)}
              target={2500}
            />
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
