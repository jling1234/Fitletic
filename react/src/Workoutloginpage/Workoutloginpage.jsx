import "../Workoutloginpage/Workoutloginpage.css";
import Header from "../Shared/Header/Header";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export function Exercise({ exerciseNumber }) {
  return (
    <>
      <div className="added-exercise">
        <p>Exercise {exerciseNumber} </p>
        <input type="text" placeholder="Name: def" />
      </div>
    </>
  );
}

export function ExerciseList() {
  const [exercises, setExercises] = useState([
    { exerciseNumber: 1 },
    { exerciseNumber: 2 },
    { exerciseNumber: 3 },
  ]);

  //to add a new exercise
  const handleAddExercise = () => {
    const newExercise = { exerciseNumber: exercises.length + 1 };
    setExercises([...exercises, newExercise]);
  };

  //delete an exercise?

  return (
    <div>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>
            <Exercise exerciseNumber={exercise.exerciseNumber} />
          </li>
        ))}
      </ul>

      <div className="add-an-exercise">
        <button type="button" onClick={handleAddExercise}>
          <p>Add an Exercise</p>
        </button>
      </div>
    </div>
  );
}

function Workoutloginpage() {
  return (
    <>
      <Header />
      <div className="workout-loginpage-container">
        <div className="left-container-workout-loginpage">
          <Link to={"/workout"} className="back-arrow">
            🡨
          </Link>
          <div className="routine-label-saved-exercises-add-exercise">
            <div className="routine-save-delete-sign">
              <div className="routine-label">
                <p>Routine 1</p>
              </div>
              <div className="save-delete-sign">
                <button
                  type="button"
                  className="save-button"
                  onClick={() => alert("You have just added a new workout!")}
                ></button>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => alert("You have just deleted a workout!")}
                ></button>
              </div>
            </div>
            <div className="saved-exercises-add-exercise-container">
              <div className="saved-exercises">
                <form>
                  <ExerciseList />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="right-container-workout-loginpage">
          {/*  <div className="text-in-the-picture">
            <p>"Exercise</p>
            <p>should be regarded</p>
            <p>as a tribute to the heart"</p>
          </div>
          */}
        </div>
      </div>
    </>
  );
}

export default Workoutloginpage;
