import Header from "../Shared/Header/Header";
import "./Profilepage.css";
import "../Homepage/Homepage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getUserRecord} from "../Shared/LocalDetails/LocalDetails.jsx";
import {getUserInfo} from "../Shared/API/Auth.js";
import {useQuery} from "react-query";

function ImageProfilePage({ username }) {
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

function RingTracker({ burntCalories, gainedCalories, goalCalories }) {
  const containerRef = useRef(null);
  const [radius, setRadius] = useState(135);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const size = Math.min(
          containerRef.current.offsetWidth,
          containerRef.current.offsetHeight,
        );
        setRadius(size * 0.4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const totalCalories = Math.max(0, gainedCalories - burntCalories);
  const progress = Math.min(totalCalories / goalCalories, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="ring-container">
      <svg className="ring-svg" height={radius * 2} width={radius * 2}>
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke="#fb5d35"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>
      <div className="ring-label">
        {" "}
        {totalCalories}/{goalCalories}
      </div>
      <p className="ring-tracker-goal-calories">Goal Calories</p>
    </div>
  );
}

function getGoalCalories(userDetails) {
  let { weight, height, age, activityLevel, goal } = userDetails;
  let bmr;

  if (!weight || !height || !age || !activityLevel || !goal) return 0;

  weight = Number(weight);
  height = Number(height);
  age = Number(age);

  if (userDetails.gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  let activityFactor = 1.2;
  switch (activityLevel) {
    case "sedentary":
      activityFactor = 1.2;
      break;
    case "lightly-active":
      activityFactor = 1.375;
      break;
    case "moderately-active":
      activityFactor = 1.55;
      break;
    case "vigorously-active":
      activityFactor = 1.725;
      break;
    case "extremely-active":
      activityFactor = 1.9;
      break;
  }

  const maintenanceKCAL = bmr * activityFactor;

  switch (goal) {
    case "weight-loss":
      return maintenanceKCAL - 500;
    case "weight-gain":
      return maintenanceKCAL + 500;
  }
  return maintenanceKCAL;
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
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="button"
        className="button-profilepage"
        onClick={() => navigate("/workoutlogin")} //change here for redirection
      >
        <p>Login a Workout</p>
      </button>
    </div>
  );
}

function LoginMealProfilePageButton() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="button"
        className="button-profilepage"
        onClick={() => navigate("/meals")}
      >
        <p>Login a Meal</p>
      </button>
    </div>
  );
}

function UserProfileRectangleLeft({ userDetails }) {
  if (!userDetails) {
    return <div className="left-white-rectangle"></div>
  }

  return (
    <div className="left-white-rectangle">
      <div className="input-fields">
        <label>
          <div className="label-container">Username:</div>
          <input type="text" defaultValue={userDetails.username} readOnly />
        </label>
      </div>
      <div className="input-fields">
        <label>
          <div className="label-container">Age:</div>
          <input type="number" defaultValue={userDetails.age} readOnly />
        </label>
      </div>
      <div className="input-fields">
        <label>
          <div className="label-container">Gender:</div>
          <input type="text" defaultValue={userDetails.gender} readOnly />
        </label>
      </div>
      <div className="input-fields">
        <label>
          <div className="label-container">Goal:</div>
          <input type="text" defaultValue={userDetails.goal} readOnly />
        </label>
      </div>
    </div>
  );
}

function UserProfileRectangleRight({ userDetails }) {
  if (!userDetails) {
    return <div className="right-white-rectangle"></div>
  }

  const heightInMeters = parseFloat(userDetails?.height) / 100;
  const weight = parseFloat(userDetails?.weight);

  let bmi = "";

  if (!isNaN(heightInMeters) && !isNaN(weight) && heightInMeters > 0) {
    const calculatedBmi = (
      weight /
      (heightInMeters * heightInMeters)
    ).toFixed(2);

    if (calculatedBmi < 18.5) {
      bmi = (`${calculatedBmi} (Underweight)`);
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.99) {
      bmi = (`${calculatedBmi} (Normal weight)`);
    } else if (calculatedBmi >= 25 && calculatedBmi < 29.99) {
      bmi = (`${calculatedBmi} (Overweight)`);
    } else {
      bmi = (`${calculatedBmi} (Obese)`);
    }
  } else {
    bmi = "";
  }

  return (
    <div className="right-white-rectangle">
      <div className="input-fields">
        <label>
          <div className="label-container">Activity Level:</div>
          <input type="text" defaultValue={userDetails.activityLevel || ""} readOnly />
        </label>
      </div>
      <div className="input-fields">
        <label>
          <div className="label-container">Height (m):</div>
          <input type="number" defaultValue={userDetails.height || ""} readOnly />
        </label>
      </div>
      <div className="input-fields">
        <label>
          <div className="label-container">Weight (kg):</div>
          <input type="number" defaultValue={userDetails.weight || ""} readOnly />
        </label>
      </div>
      <div className="input-fields">
        <label>
          <div className="label-container">BMI:</div>
          <input type="text" defaultValue={bmi} readOnly />
        </label>
      </div>
    </div>
  );
}

function Profilepage() {
  const { data: userInfo, isLoading, isError } = useQuery("userInfo", getUserInfo);

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (!userInfo) return;

    let userDetails = getUserRecord(userInfo.username);
    if (userDetails === null) {
      userDetails = {};
    }

    setUserDetails(userDetails);
  }, [userInfo]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading user info</p>;

  const goalCalories = userDetails ? Math.round(getGoalCalories(userDetails)) : 0;

  return (
    <>
      <Header />
      <div className="biggest-container">
        <div className="grid-container-profilepage">
          <div className="left-grid-container-pp-12">
            <ImageProfilePage username={userInfo.username} />
          </div>
          <div className="top-grid-container-pp-1">
            <RingTracker
              burntCalories={450}
              gainedCalories={2500}
              goalCalories={goalCalories}
            />
          </div>
          <div className="top-grid-container-pp-2">
            <OverviewProfilePage />
            <LoginButtonsProfilePage />
          </div>
          <div className="bottom-grid-container-pp-1">
            <UserProfileRectangleLeft
              userDetails={{ ...userDetails, username: userInfo.username }}
            />
          </div>
          <div className="bottom-grid-container-pp-2">
            <UserProfileRectangleRight userDetails={userDetails} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profilepage;
