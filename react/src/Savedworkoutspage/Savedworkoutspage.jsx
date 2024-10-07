import Header from "../Shared/Header/Header";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Savedworkoutspage.css";
import { getToken } from "../Shared/LocalDetails/LocalDetails.jsx";
import {
  BuildANewRoutineButton,
  WorkoutCalorieTracker,
} from "../Workoutspage/Workoutspage";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import {
  getWorkouts,
  saveLoggedWorkoutResponse,
} from "../Shared/API/Workout.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAPIBaseUrl } from "../Shared/API/Env.js";

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
  const { data: workouts } = useQuery("workouts", getWorkouts);

  return (
    <>
      {/* Make this dynamic ie the same number of containers for the same number of saved routines */}
      <div className="rectangle-box">
        {workouts &&
          workouts.map((exercise, index) => (
            <div key={index} className="savedroutines">
              <div className="saved-routines-inputfield-container">
                <Savedroutines routineName={exercise.workoutName} />
              </div>
              <div className="plus-button-container">
                <Plusbutton workoutId={exercise.id} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

function Plusbutton({ workoutId }) {
  const queryClient = useQueryClient();
  const saveLoggedMutate = useMutation({
    mutationFn: async () => {
      return await saveLoggedWorkoutResponse(workoutId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("calories");
    },
  });

  return (
    <>
      <button
        type="button"
        className="plus-button"
        onClick={() => saveLoggedMutate.mutate()}
      >
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
        <Savedroutineslabel />
      </div>
      <div className="whole-page-container">
        {/**child container of the whole page container */}

        <div className="rectangle-box-container">
          <Rectanglebox />
        </div>

        <div className="tracker-container">
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
