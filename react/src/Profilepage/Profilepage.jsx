import Header from "../Shared/Header/Header";
import "./Profilepage.css";
import "../Homepage/Homepage.css";
import { getUserRecord } from "../Shared/LocalDetails/LocalDetails.jsx";
import { getUserInfo } from "../Shared/API/Auth.js";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";


function ImageProfilePage({ username }) {
  return (
    <>
      <div className="img-profilepage">
        <div className="img-text">
          Hello,<br />
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
  const navigate = useNavigate();

  return (
    <div>
      <button
        type="button"
        className="button-profilepage"
        onClick={() => navigate("/workoutlogin")} // change here for redirection
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

  return (
    <>
      <div className="left-white-rectangle">

        <div className="input-fields">
          <label>
            <div className="username-pp">
              Username:
              <input type="text" value={userDetails.username} />
            </div>
          </label>
        </div>
        <div className="input-fields">
          <label>
            <div className="age-pp">
              Age:
              <input type="number" value={userDetails.age} />
            </div>
          </label>
        </div>
        <div className="input-fields">
          <label>
            <div className="gender-pp">
              Gender:
              <input type="text" value={userDetails.gender} />
            </div>
          </label>
        </div>
        <div className="input-fields">
          <label>
            <div className="goal-pp">
              Goal:
              <input type="text" value={userDetails.goal} />
            </div>
          </label>
        </div>
      </div>
    </>
  );
}

function UserProfileRectangleRight({ userDetails }) {
  const [bmi, setBmi] = useState("");

  useEffect(() => {
    if (userDetails.height > 0 && userDetails.weight > 0) {
      const calculatedBmi = (userDetails.weight / (userDetails.height * userDetails.height)).toFixed(2);
      setBmi(calculatedBmi);
    } else {
      setBmi("");
    }
  }, [userDetails.height, userDetails.weight]);

  return (
    <div className="right-white-rectangle">
      <div className="activity-lvl">
        Activity Level:
        <div className="input-fields">
          <input
            type="text"
            value={userDetails.activityLevel}

          />
        </div>
      </div>
      <div className="height-pp">
        Height(m):
        <div className="input-fields">
          <input
            type="number"
            value={userDetails.height}
          />
        </div>
      </div>
      <div className="weight-pp">
        Weight(kg):
        <div className="input-fields">
          <input
            type="number"
            value={userDetails.weight}
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
  );
}


function Profilepage() {

  const { data: userInfo, isLoading, isError } = useQuery("userInfo", getUserInfo);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading user info</p>;

  console.log('userInfo:', userInfo);

  const userDetails = getUserRecord(userInfo?.username);

  console.log('userDetails:', userDetails);



  return (
    <>
      <Header />
      <div className="biggest-container">
        <div className="grid-container-profilepage">
          <div className="left-grid-container-pp-12">
            <ImageProfilePage username={userInfo.username} />
          </div>
          <div className="top-grid-container-pp-1">
            <RingTracker />
          </div>
          <div className="top-grid-container-pp-2">
            <OverviewProfilePage />
            <LoginButtonsProfilePage />
          </div>
          <div className="bottom-grid-container-pp-1">
            <UserProfileRectangleLeft userDetails={{ ...userDetails, username: userInfo.username }} />
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