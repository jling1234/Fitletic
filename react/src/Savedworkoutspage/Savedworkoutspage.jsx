import Header from "../Shared/Header/Header";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import "./Savedworkoutspage.css";
import { BuildANewRoutineButton, WorkoutCalorieTracker } from "../Workoutspage/Workoutspage";
import { FaArrowLeft } from "react-icons/fa";
export function BackArrow() {
  return (
    <Link to={"/workout"} className="back-arrow">
      <FaArrowLeft />
    </Link>
  );
}

function Savedroutineslabel() {
  return <h1>Saved Routines</h1>;
}

function Rectanglebox() {
  return (
    <>
      <div className="rectangle-box">
        <div className="saved-routines-inputfield-container">
          <Savedroutines />
        </div>
        <div className="plus-button-container">
          <Plusbutton />
        </div>
        <div className="saved-routines-inputfield-container">
          <Savedroutines />
        </div>
        <div className="plus-button-container">
          <Plusbutton />
        </div>
        <div className="saved-routines-inputfield-container">
          <Savedroutines />
        </div>
        <div className="plus-button-container">
          <Plusbutton />
        </div>
        <div className="saved-routines-inputfield-container">
          <Savedroutines />
        </div>
        <div className="plus-button-container">
          <Plusbutton />
        </div>
        <div className="saved-routines-inputfield-container">
          <Savedroutines />
        </div>
        <div className="plus-button-container">
          <Plusbutton />
        </div>
        <div className="saved-routines-inputfield-container">
          <Savedroutines />
        </div>
        <div className="plus-button-container">
          <Plusbutton />
        </div>
      </div>
    </>
  );
}

function Plusbutton() {
  return (
    <>
      <button type="button" className="plus-button">
        <p>+</p>
      </button>
    </>
  );
}

function Savedroutines() {
  return (
    <>
      <input type="text" className="saved-routines-inputfield" readOnly></input>
    </>
  );
}

function DumbbellsImg() {
  return (
    <>
      <div className="dumbbells-img">
        {/**trackers go here; take from prev page*/}
        <div className="workoutcaltracker-container">
          <WorkoutCalorieTracker />
        </div>
      </div>
    </>
  );
}

export default function Savedworkoutspage() {
  const [workout,setWorkout] = useState([]);

  const handleFetchWorkouts=async(event)=>
  {
    try {
      const response = await axios.get("http://localhost:8080/workout/getWorkouts", {
        headers: {Authorization:"Bearer " + getToken()}
      });

      setWorkout(response.data);
      console.log(workout);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Header />
      <div className="backarrow-savedroutines-label">
        <BackArrow />
        <div className="saved-routines-container">
          <Savedroutineslabel />
        </div>
      </div>
      <div className="whole-page-container">
        <div>
          {/**child container of the whole page container */}

          <div className="rectangle-box-container">
            <Rectanglebox />
          </div>
        </div>
        <div>
          {/**child container of the whole page container */}
          <DumbbellsImg />
          <div className="new-routine-button">
            <BuildANewRoutineButton />
          </div>
        </div>
      </div>
    </>
  );
}
