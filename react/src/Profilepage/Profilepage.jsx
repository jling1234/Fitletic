import Header from "../Shared/Header/Header";
import "./Profilepage.css";
import "../Homepage/Homepage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getUserRecord, setUserRecord} from "../Shared/LocalDetails/LocalDetails.jsx";
import {getUserInfo} from "../Shared/API/Auth.js";
import {useQuery} from "react-query";
import {getLoggedCaloriesFromAllMeals, getLoggedMealsToday} from "../Shared/API/Meals.js";

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

function OverviewProfilePage({ gainedCalories, burntCalories }) {
  return (
    <>
      <div className="overview-text">
        <p>OVERVIEW</p>
      </div>
      <div className="cal-values-flex-container">
        <div className="cal-values">
          <p className="number-cal">{burntCalories} Kcal</p>
          <p className="text-cal">Burnt Calories</p>
        </div>
        <div className="cal-values">
          <p className="number-cal">{gainedCalories} Kcal</p>
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
  let strokeDashoffset = circumference - progress * circumference;
  if (isNaN(strokeDashoffset)) {
    strokeDashoffset = 0;
  }

  return (
    <div className="ring-container">
      <svg className="ring-svg" height={radius * 2} width={radius * 2}>
        <circle
          stroke="white"
          fill="#eeeeee"
          strokeWidth={strokeWidth}
          r={normalizedRadius + strokeWidth}
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

function UserProfileRectangleLeft({ userDetails, setUserDetails }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  if (!userDetails) {
    return <div className="left-white-rectangle"></div>;
  }

  return (
    <div className="left-white-rectangle">
      <div className="input-fields">
        <label>
          <div className="label-container">Username:</div>
          <input
            className="text-field-info"
            type="text"
            name="username"
            value={userDetails.username}
            onChange={handleChange}
            readOnly
          />
        </label>
      </div>
      <div className="input-fields">
        <label>
          <div className="label-container">Age:</div>
          <input
            className="number-field-size"
            type="number"
            name="age"
            value={userDetails.age || ""}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-fields">
        <label>
          <div className="label-container">Gender:</div>
          <select
            className="dropdown"
            name="gender"
            value={userDetails.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
      </div>
      <div className="input-fields">
        <label>
          <div className="label-container">Goal:</div>
          <select
            className="dropdown"
            name="goal"
            value={userDetails.goal || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="maintain-weight">Maintain Weight</option>
            <option value="weight-gain">Weight Gain</option>
            <option value="none">None of these</option>
          </select>
        </label>
      </div>
    </div>
  );
}

function UserProfileRectangleRight({ userDetails, setUserDetails }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const heightInMeters = parseFloat(userDetails?.height) / 100;
  const weight = parseFloat(userDetails?.weight);

  let bmi = '';

  if (!isNaN(heightInMeters) && !isNaN(weight) && heightInMeters > 0) {
    const calculatedBmi = (
      weight /
      (heightInMeters * heightInMeters)
    ).toFixed(2);

    if (calculatedBmi < 18.5) {
      bmi = `${calculatedBmi} (Underweight)`;
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.99) {
      bmi = `${calculatedBmi} (Normal weight)`;
    } else if (calculatedBmi >= 25 && calculatedBmi < 29.99) {
      bmi = `${calculatedBmi} (Overweight)`;
    } else {
      bmi = `${calculatedBmi} (Obese)`;
    }
  } else {
    bmi = '';
  }

  return (
    <div className="right-white-rectangle">
      <div className="input-fields">
        <label>
          <div className="label-container">Activity Level:</div>
          <select
            className="dropdown"
            name="activityLevel"
            value={userDetails.activityLevel || ''}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="sedentary">Sedentary</option>
            <option value="moderately-active">Moderately Active</option>
            <option value="vigorously-active">Vigorously Active</option>
            <option value="extremely-active">Extremely Active</option>
            <option value="none">None of these</option>
          </select>
        </label>
      </div>
      <div className="input-fields">
        <label>
          <div className="label-container">Height (cm):</div>
          <input
            className="number-field-size"
            type="number"
            name="height"
            value={userDetails.height || ''}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-fields">
        <label>
          <div className="label-container">Weight (kg):</div>
          <input
            className="number-field-size"
            type="number"
            name="weight"
            value={userDetails.weight || ''}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="input-fields">
        <label>
          <div className="label-container">BMI:</div>
          <input className="text-field-info" type="text" value={bmi} readOnly />
        </label>
      </div>
    </div>
  );
}

function Profilepage() {
  const navigate = useNavigate();

  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery("userInfo", getUserInfo);

  const { data: loggedMeals } = useQuery("loggedMeals", getLoggedMealsToday);

  const [userDetails, setUserDetails] = useState({
    username: "",
    age: "",
    gender: "",
    goal: "",
    activityLevel: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    if (!isLoading && !userInfo) {
      navigate("/login", { replace: true });
    }
  }, [navigate, userInfo, isLoading]);

  useEffect(() => {
    if (!userInfo) return;

    let userRecord = getUserRecord(userInfo.username);
    if (userRecord === null) {
      setUserDetails({
        username: userInfo.username,
      });
    } else {
      setUserDetails({ ...userRecord, username: userInfo.username });
    }
  }, [userInfo]);

  const onSaveButtonClick = () => {
    if (!userInfo) return;

    const userRecord = { ...userDetails };
    delete userRecord["username"];
    setUserRecord(userInfo.username, userRecord);
    window.location.reload();
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading user info</p>;

  const intakeCalories = getLoggedCaloriesFromAllMeals(loggedMeals);

  const goalCalories = userDetails
    ? Math.round(getGoalCalories(userDetails))
    : 0;

  return (
    <>
      <Header />
      <div className="biggest-container">
        <div className="grid-container-profilepage">
          <div className="left-grid-container-pp-12">
            <ImageProfilePage username={userDetails.username} />
          </div>
          <div className="top-grid-container-pp-1">
            <RingTracker
              burntCalories={450}
              gainedCalories={intakeCalories}
              goalCalories={goalCalories}
            />
            {goalCalories === 0 ? (
              <p className="ring-tracker-warning">
                Fill in your details to calculate your goal calories!
              </p>
            ) : null}
          </div>
          <div className="top-grid-container-pp-2">
            <OverviewProfilePage gainedCalories={intakeCalories} burntCalories={450}/>
            <LoginButtonsProfilePage />
          </div>
          <div className="bottom-grid-container-pp-1-2">
            <div className="bottom-grid-container-pp-1">
              <UserProfileRectangleLeft
                userDetails={userDetails}
                setUserDetails={setUserDetails}
              />
            </div>
            <div className="bottom-grid-container-pp-2">
              <UserProfileRectangleRight
                userDetails={userDetails}
                setUserDetails={setUserDetails}
              />
            </div>
            <button
              type="button"
              className="profile-save-button button-profilepage"
              onClick={onSaveButtonClick}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profilepage;
