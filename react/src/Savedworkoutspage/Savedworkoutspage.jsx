import Header from "../Shared/Header/Header";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Savedworkoutspage.css";
import {getToken} from "../Shared/LocalDetails/LocalDetails.jsx"
import {
  BuildANewRoutineButton,
  WorkoutCalorieTracker,
} from "../Workoutspage/Workoutspage";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

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
  const [workout, setWorkout] = useState([]);

  const handleFetchWorkouts = async (event) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/workout/getWorkouts",
        {
          headers: { Authorization: "Bearer " + getToken()},
        }
      );

      setWorkout(response.data);
      console.log(workout);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleFetchWorkouts();
  }, []);
    const [calories,setCalories] = useState(0);
    const handleAddLoggedWorkout = async (routineId) => {
      try{
          const response= await axios.get(
              "http://localhost:8080/userExercise/getCalories",
              {
                  headers: { Authorization: "Bearer " + getToken() },
              }
              );
          setCalories(response.data);
      }catch (error){
          console.log("Error: ",error);
      }
    };

  return (
    <>
      {/* Make this dynamic ie the same number of containers for the same number of saved routines */}
      <div className="rectangle-box">
        {workout.map((exercise, index) => (
          <div key={index} className="savedroutines">
            <div className="saved-routines-inputfield-container">
              <Savedroutines routineName={exercise.workoutName} />
            </div>
            <div className="plus-button-container">
              <Plusbutton routineId={exercise.id} onAdd={handleAddLoggedWorkout} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Plusbutton({routineId,onAdd}) {



    return (
    <>
      <button type="button" className="plus-button"  onClick={() => onAdd(routineId)}>
        <p>+</p>
      </button>
    </>
  );
}

function Savedroutines({ routineName }) {
  return (
    <>
      <input
        type="text"
        value={routineName}
        className="saved-routines-inputfield"
        readOnly
      ></input>
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
