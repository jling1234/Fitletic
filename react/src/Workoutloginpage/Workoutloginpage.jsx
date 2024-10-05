import "../Workoutloginpage/Workoutloginpage.css";
import Header from "../Shared/Header/Header";
//eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {getToken} from "../Shared/LocalDetails/LocalDetails.jsx"

import { BackArrow } from "../Savedworkoutspage/Savedworkoutspage";
import axios from "axios";
import { getUserInfo } from "../Shared/API/Auth";
import { useQueryClient } from "react-query";
import {getAPIBaseUrl} from "../Shared/API/Env.js";

// eslint-disable-next-line react/prop-types
export function Exercise({ exerciseName }) {
  const menuRef = useRef(null);

  return (
    <>
      <input
        ref={menuRef}
        type="text"
        className="added-exercise-input-field"
        value={exerciseName}
        readOnly
      />

      {/** <span className="time-suffix">:min</span>*/}
    </>
  );
}

// eslint-disable-next-line react/prop-types
function TimeInputField({ onTimeChange, time, index }) {
  const handleTimeChange = (event) => {
    let newTime = event.target.value;

    console.log(newTime);

    if (newTime.length > 3) {
      newTime = newTime.slice(0, 3);
    }

    const numericTime = Number(newTime);
    if (numericTime >= 0) {
      onTimeChange(index, numericTime); // Update the time only if it's greater than 1
    } else {
      alert("Time should be greater than 0 minutes!"); // Optional alert or message
    }
  };

  return (
    <>
      <input
        className="time-field"
        type="text"
        placeholder=""
        value={time}
        onChange={handleTimeChange}
      ></input>
      {/*time suffix */}
      <span>min</span>
    </>
  );
}

// eslint-disable-next-line react/prop-types
function MenuButton({ index, onDelete }) {
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
      <button
        ref={menuRef}
        type="button"
        className="menu-button"
        onClick={handleMenuClick}
      >
        ...
      </button>
      {showContextMenu && (
        <button
          ref={menuRef}
          className="delete-button"
          onClick={handleDelete}
        ></button>
      )}
    </>
  );
}

// eslint-disable-next-line react/prop-types
export function AddAnExerciseButton({ handleAddExercise }) {
  //to add a new exercise
  return (
    <>
      <div className="addexercise-container">
        <button
          type="button"
          onClick={handleAddExercise}
          className="addexercise-button"
        >
          <p className="button-text">Add an Exercise</p>
        </button>
      </div>
    </>
  );
}

// eslint-disable-next-line no-unused-vars
function SaveButton({ onSave }) {
  return (
    <>
      <button type="button" className="save-button" onClick={onSave}></button>
    </>
  );
}

function Workoutloginpage() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [inputtedExercises, setInputtedExercises] = useState("");
  const [results, setResults] = useState([]);
  const [exercises, setExercises] = useState([]);

  const navigate = useNavigate();
  /* const [query, setQuery] = useState("");*/

  

  function generateUniqueId() {
    return Date.now() + Math.random().toString(36).substring(2, 9);
  }

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      {
        id: generateUniqueId(),
        exerciseName: "Name:def",
        time: 0,
  
        
        exerciseId: "",
      },
    ]);
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
  const fetchDataExercise = async (value) => {
    try {
      const response = await axios.get(getAPIBaseUrl() + "/exercise", {
        headers: {Authorization:"Bearer " + getToken()}});
      const results = response.data.filter((inputtedExercises) => {
        return (
            value &&
            inputtedExercises &&
            inputtedExercises.title &&
            inputtedExercises.title.toLowerCase().includes(value.toLowerCase())
        );
        console.log(response);
      });
      console.log(results);
      setResults(results);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  //to make the routine name editable
  const [routineName, setRoutineName] = useState("Enter Routine Name");
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const handleNameChange = (event) => {
    setRoutineName(event.target.value);
  };

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleSelectedExercise = (selectedExercise, id) => {
    setExercises((prevExercises) => {
      return prevExercises.map((exercise, index) => {
        return index === prevExercises.length - 1
          ? {
              ...exercise,
              exerciseName: selectedExercise,
             
              exerciseId: id,
            }
          : exercise;
      });
    });
    console.log(exercises);
  };

let newWorkoutId;

  //when save button is clicked
  const handleSaveWorkout = async (event) => {
    event.preventDefault();
    try {
     const response = await axios.post(getAPIBaseUrl() + "/workout/save",
         {
            userId: getUserInfo().id,
            workoutName:routineName,
          },
         {
           headers: {Authorization: "Bearer " + getToken()},
         });

     console.log(response);
     newWorkoutId=response.data.id;
     await queryClient.invalidateQueries("workout");

   }catch (error){
     console.log("Error: ",error);
   }
   console.log(newWorkoutId);
   try {
       console.log("Entered 2nd block")
     for(const item of exercises)
      {
        const response1 = await axios.post(getAPIBaseUrl() + "/userExercise/save",
            {
              userId: getUserInfo.id,
              workoutId: newWorkoutId,
              exerciseId:item.exerciseId,
              time:item.time,
            },
            {
              headers: {Authorization: "Bearer " + getToken()},
            });
        console.log(response1.data);
      }
    }catch (error) {
      console.log("Error: ",error);
    }
    navigate("/workout");
  };

  const handleTimeChange = (id, newTime) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, time: newTime } : exercise
      )
    );
    console.log(exercises);
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
        {/**need the below div to load the img */}
        <div>
          <BackArrow />

          <div className="left-hand-side">
            {/*Routine name should be connected to the backend to display the routine name*/}
            <div className="routine-label">
              {isEditing ? (
                <input
                  type="text"
                  value={routineName}
                  onChange={handleNameChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <div onClick={handleNameClick}>{routineName}</div>
              )}
            </div>
            <SaveButton onSave={handleSaveWorkout} />
            <ul>
              {exercises.map((exercise) => (
                <li key={exercise.id} className="savedexercise-form">
                  <Exercise exerciseName={exercise.exerciseName} />
                  <TimeInputField
                    time={exercise.time}
                    onTimeChange={handleTimeChange}
                    index={exercise.id}
                  />

                  <MenuButton
                    index={exercise.id}
                    onDelete={handleDeleteExercise}
                  />
                </li>
              ))}
              <AddAnExerciseButton
                handleAddExercise={handleAddAnExerciseClick}
              />
            </ul>
          </div>
        </div>
        <div className="right-container-workout-loginpage">
          {!showSearchBar && (
            <div className="right-container-workout-loginpage"></div>
          )}
          {showSearchBar && (
            <>
              <div className="searchbar-container show">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for an exercise..."
                  value={inputtedExercises}
                  onChange={(e) => handleChange(e.target.value)}
                  className="search-input"
                />
              </div>
              {results.length > 0 && (
                <ul className="dropdown-list">
                  {results.map((exercise) => (
                    <li
                      key={exercise.id}
                      onClick={() =>
                        handleSelectedExercise(
                          exercise.title,
                          
                          exercise.id
                        )
                      }
                    >
                      {exercise.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Workoutloginpage;
