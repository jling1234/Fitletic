import "../Workoutloginpage/Workoutloginpage.css";
import Header from "../Shared/Header/Header";
import { Link } from "react-router-dom";
//eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
export function Exercise({ index, onDelete }) {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const menuRef = useRef(null);

  const handleMenuClick = () => {
    setShowContextMenu(!showContextMenu);
  };

  const handleDelete = () => {
    onDelete(index);
    setShowContextMenu(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowContextMenu(false);
    }
  };

  useEffect(() => {
    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={menuRef} className="added-exercise">
        <p></p>
        <input type="text" placeholder="Name: def" readOnly />
        {/*Input field to store the time in minutes */}
        <button type="button" className="menu-button" onClick={handleMenuClick}>
          ...
        </button>
        {showContextMenu && (
          <div className="context-menu">
            <button className="delete-button" onClick={handleDelete}></button>
          </div>
        )}
      </div>
    </>
  );
}

// eslint-disable-next-line react/prop-types
export function AddAnExerciseButton({handleAddExercise})
{
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
  const [exercises, setExercises] = useState([{ id: generateUniqueId() }]);

  function generateUniqueId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  }

  const handleAddExercise = () => {
    setExercises([...exercises, { id: generateUniqueId() }]);
  };

  //delete individual exercises
  const handleDeleteExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  const handleAddAnExerciseClick = () => {
    setShowSearchBar(true);
    handleAddExercise();
  };
  const handleChange = (value) => {
    setInputtedExercises(value);
    fetchDataExercise(value);
  };
  // eslint-disable-next-line no-unused-vars
  const fetchDataExercise = (value) => {
    fetch("http://localhost:8080/exercise")
      .then((response) => response.json())
      .then((json) => {

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

      })
      .catch((error) => console.error("Error:", error));
  };

  //to make the routine name editable
  const [routineName, setRoutineName] = useState("Routine 1");
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (event) => {
    setRoutineName(event.target.value);
  };

  const handleNameClick = () => {
    setIsEditing(true);
  };


  const handleBlur = () => {
    setIsEditing(false);
  };




  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false); // Exit edit mode when Enter is pressed
    }
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
              {/*Routine name should be connected to the backend to display the routine name*/}
              <div className="routine-label" >
                {isEditing ? (
                  <input
                    type="text"
                    value={routineName}
                    onChange={handleNameChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                  />
                ) : (
                  <p onClick={handleNameClick}>{routineName}</p>
                )}
              </div>
              <div className="save-delete-sign">
                <button
                  type="button"
                  className="save-button"
                  onClick={() => alert("You have just added a new workout!")}
                ></button>

              </div>
            </div>
            <div className="saved-exercises-add-exercise-container">
              <div className="saved-exercises">
                <form>
                  <div>
                    <ul>
                      {exercises.map((exercise) => (
                        <li key={exercise.id}>
                          <Exercise
                            index={exercise.id}
                            onDelete={handleDeleteExercise}
                          />
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
                      <li key={exercise.id} >
                        {exercise.title}</li>
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
