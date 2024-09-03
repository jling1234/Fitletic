import "../Workoutloginpage/Workoutloginpage.css";
import Header from "../Shared/Header/Header";
import { Link } from "react-router-dom";
//eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export function Exercise({ exerciseNumber }) {
  return (
    <>
      <div className="added-exercise">
        <p>Exercise {exerciseNumber} </p>
        <input type="text" placeholder="Name: def" />
        <menu
          type="context"
          onClick={() => alert("You have opened a context menu!")}
        >
          ...
        </menu>
      </div>
    </>
  );
}

export function ExerciseList() {
  return (
    <>
      <div className="add-an-exercise">
        <button type="button" onClick={handleAddExercise}>
          <p>Add an Exercise</p>
        </button>
      </div>
    </>
  );
}

// eslint-disable-next-line react/prop-types
export function AddAnExerciseButton({
  onClick,
  handleAddExercise,
  handleDeleteExercise,
}) {
  //to add a new exercise
  return (
    <>
      <div className="add-an-exercise-container">
        <button type="button" onClick={handleAddExercise}>
          <p>Add an Exercise</p>
        </button>
      </div>
    </>
  );
}

function Workoutloginpage() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [inputtedExercises, setInputtedExercises] = useState("");
  const [results, setResults] = useState([]);
  const [exercises, setExercises] = useState([{ exerciseNumber: 1 }]);

  const handleAddExercise = () => {
    const newExercise = { exerciseNumber: exercises.length + 1 };
    setExercises([...exercises, newExercise]);
  };

  const handleDeleteExercise = () => {
    setExercises([{ exerciseNumber: 1 }]);
  };

  const handleAddAnExerciseClick = () => {
    setShowSearchBar(true);
    handleAddExercise();
  };

  // eslint-disable-next-line no-unused-vars
  const fetchData = (value) => {
    fetch("http://localhost:8080/workout")
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json)) {
          const results = json.filter((inputtedExercises) => {
            return (
              value &&
              inputtedExercises &&
              inputtedExercises.title &&
              inputtedExercises.title
                .toLowerCase()
                .includes(value.toLowerCase())
            );
          });
          console.log(results);
          setResults(results);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleChange = (value) => {
    setInputtedExercises(value);
    fetchData(value);
  };

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
                  onClick={handleDeleteExercise}
                ></button>
              </div>
            </div>
            <div className="saved-exercises-add-exercise-container">
              <div className="saved-exercises">
                <form>
                  <div>
                    <ul>
                      {exercises.map((exercise, index) => (
                        <li key={index}>
                          <Exercise exerciseNumber={exercise.exerciseNumber} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <AddAnExerciseButton
                    handleAddExercise={handleAddAnExerciseClick}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "right-container-workout-loginpage $ {showSearchBar ? 'hide' : ''}"
          }
        >
          {!showSearchBar && (
            <div className="right-container-workout-loginpage"></div>
          )}
          {showSearchBar && (
            <>
              <div className="searchbar-container show">
                <FaSearch if="search-icon" />

                <input
                  type="text"
                  placeholder="Search for an exercise..."
                  value={inputtedExercises}
                  onChange={(e) => handleChange(e.target.value)}
                  className="search-input"
                ></input>
                {results.length > 0 && (
                  <ul className="dropdown-list">
                    {results.map((exercise) => (
                      <li key={exercise.id}>{exercise.title}</li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
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
