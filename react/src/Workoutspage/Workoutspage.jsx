import { Footer } from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import "../Workoutspage/Workoutspage.css";
import "../MealsPage/MealsPage.css";
import { Link, useNavigate } from "react-router-dom";
import "./Assets/workoutsimg.png";
import { useQueryClient, useMutation, useQuery } from "react-query";

import {
  deleteWorkout,
  getLoggedWorkoutResponses,
  getWorkouts,
} from "../Shared/API/Workout";
import { useRef } from "react";

export function RoutineInputFieldRow() {
  const { data: savedRoutineField } = useQuery("workout", getWorkouts);

  return (
    <>
      <ul className="saved-meals-flex-container">
        {savedRoutineField &&
          savedRoutineField.map((workout) => (
            <Workoutcard key={workout.id} workout={workout}></Workoutcard>
          ))}
      </ul>
    </>
  );
}
function Workoutcard({ workout }) {
  const queryClient = useQueryClient();
  const deleteWorkoutDialogRef = useRef(null);
  const navigate = useNavigate();

  const deleteWorkoutMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteWorkout(id);
    },
    onSuccess: async (id) => {
      await queryClient.invalidateQueries("workout");
    },
  });

  const onDeleteWorkout = async () => {
    deleteWorkoutDialogRef.current.showModal();
  };

  return (
    <div className="saved-meals">
      <DeleteWorkoutDialog
        workout={workout}
        deleteWorkoutDialogRef={deleteWorkoutDialogRef}
        deleteWorkoutCallback={async () => {
          console.log(workout);
          await deleteWorkoutMutation.mutate(workout.id);
        }}
      />
      <div>
        <p>{workout.workoutName}</p>
        <button
          type="button"
          onClick={() =>
            navigate("/workouteditpage/" + workout.id)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
        </button>
        <button type="button" onClick={onDeleteWorkout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function DeleteWorkoutDialog({
  workout,
  deleteWorkoutDialogRef,
  deleteWorkoutCallback,
}) {
  const closeDialog = () => {
    deleteWorkoutDialogRef.current.close();
  };

  return (
    <dialog className="delete-meal-dialog" ref={deleteWorkoutDialogRef}>
      <div className="dialog-content-wrapper">
        <div className="dialog-header">
          <h2>Delete Workout</h2>
          <button className="dialog-close-button" onClick={closeDialog}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
        <div className="dialog-content">
          <p>
            Are you sure you want to delete the meal &apos;{workout.workoutName}
            &apos;?
          </p>
          <p>
            This action cannot be undone, and any calories logged will be
            removed.
          </p>
        </div>
        <div className="dialog-button-wrapper">
          <button
            onClick={deleteWorkoutCallback}
            className="dialog-confirm-button"
          >
            Confirm
          </button>
          <button onClick={closeDialog}>Cancel</button>
        </div>
      </div>
    </dialog>
  );
}

export function BuildANewRoutineButton() {
  return (
    <>
      <Link to={"/workoutlogin"}>
        <button type="button" className="build-a-new-routine-button">
          <p>Build a new routine</p>
        </button>
      </Link>
    </>
  );
}

function LogAWorkoutButton() {
  return (
    <Link to={"/savedworkoutspage"}>
      <button type="button">
        <p>Log a Workout</p>
      </button>
    </Link>
  );
}

export function WorkoutCalorieTracker() {
  const { data: calories } = useQuery("calories", getLoggedWorkoutResponses);
  const totalCalories = calories
    ? calories.reduce((sum, workout) => sum + workout.calories, 0)
    : 0;
  return (
    <div className="burntcal-tracker">
      <h1>{totalCalories} KCAL </h1>
      <h6> burnt from workout</h6>
    </div>
  );
}

function Workoutspage() {
  return (
    <>
      <Header />
      <div className="toppage-container">
        <div className="workoutspage-image-container">
          <div className="accessories-container">
            <div className="workouts-label">
              <p>WORKOUTS</p>
            </div>
            <div className="burntcal-tracker-and-workoutlog">
              <WorkoutCalorieTracker />
              <div className="workoutlog">
                <LogAWorkoutButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottompage-container">
        <div className="my-routines-label">
          <p>MY ROUTINES</p>
        </div>
        <div className="routines-input-fields">
          <RoutineInputFieldRow />
        </div>
        <div className="build-a-new-routine-container">
          <BuildANewRoutineButton />
        </div>
      </div>

      <Footer />
    </>
  );
}
export default Workoutspage;
