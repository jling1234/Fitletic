import "../Workoutloginpage/Workoutloginpage.css";
import Header from "../Shared/Header/Header";
import {Link} from "react-router-dom";
//eslint-disable-next-line no-unused-vars
import React, {useState, useEffect, useRef} from "react";
import {FaSearch} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

// eslint-disable-next-line react/prop-types
export function Exercise({index, exerciseName, onDelete, onTimeChange, time}) {
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
    const handleTimeChange = (event) => {
        const time = event.target.value;
        if (time >= 0) {
            onTimeChange(index, time);  // Update the time only if it's greater than 1
        } else {
            alert("Time should be greater than 0 minutes!");  // Optional alert or message
        }
    }
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
                <input type="text"
                       className="added-exercise-input-field"
                       value={exerciseName}
                       readOnly/>
                <div className="time-field-container">
                    <input
                        className="time-field"
                        type="number"
                        placeholder="Enter time in min"
                        value={time}
                        onChange={handleTimeChange}
                        style={{width: '50px', textAlign: 'right'}}

                    />
                    <span className="time-suffix">:min</span>
                </div>
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
export function AddAnExerciseButton({handleAddExercise}) {
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
    const [exercises, setExercises] = useState([]);
    const [saveTriggered, setSaveTriggered] = useState(false); // Flag to control saving
    const navigate = useNavigate();
    /* const [query, setQuery] = useState("");*/

    function generateUniqueId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }

    const handleAddExercise = () => {
        setExercises([...exercises, {id: generateUniqueId(), exerciseName: "Name:def", time: " min", exerciseType: "",calorieCount: ""}]);
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

    const handleSelectedExercise = (selectedExercise,type) => {
        setExercises((prevExercises) => {
            return prevExercises.map((exercise, index) => {
                return index === prevExercises.length - 1 ? {...exercise, exerciseName: selectedExercise,exerciseType: type} : exercise;
            });

        });
        console.log(exercises);
    };

    const handleCalorieCount = () => {
        let totalCalories = 0;
        //update for all types
        exercises.forEach((exercise) =>{
             if(exercise.exerciseType==="Strength")
                totalCalories+=exercise.time*4;
             else  if(exercise.exerciseType==="Stretching")
                 totalCalories+=exercise.time*3;
             else if(exercise.exerciseType==="Plyometrics")
                 totalCalories+=exercise.time*8.5;
             else if(exercise.exerciseType==="Powerlifting")
                 totalCalories+=exercise.time*6.67
             else
                totalCalories+=exercise.time*3;

         });

        setExercises((prevExercises) =>
            prevExercises.map((exercise) => ({
                ...exercise,
                calorieCount: totalCalories.toString() // Update calorieCount for every exercise
            }))
        );

        navigate("/workout");
        console.log(exercises);
        return totalCalories.toString();
    };


    //when save button is clicked
    const handleSaveExercise=() =>{

        const totalcalories=handleCalorieCount();
        exercises.forEach((exercise) => {
            // Add the workoutTitle to each exercise before sending

            const exerciseWithRoutineName = { ...exercise, routineName: routineName,calorieCount:totalcalories };
            console.log(exerciseWithRoutineName);

            // Send each exercise individually
            fetch("http://localhost:8080/workout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(exerciseWithRoutineName), // Send the exercise with the routineName
            })
                .catch((error) => console.error("Error saving exercise:", error));
        });
        navigate("/workout");
    };


    const handleTimeChange = (id, newTime) => {
        setExercises((prevExercises) =>
            prevExercises.map((exercise) =>
                exercise.id === id ? {...exercise, time: newTime} : exercise
            )
        );

    };


    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            setIsEditing(false); // Exit edit mode when Enter is pressed
        }
    };

    return (
        <>
            <Header/>
            <div className="workout-loginpage-container">
                <div className="left-container-workout-loginpage">
                    <Link to={"/workout"} className="back-arrow">
                        🡨
                    </Link>
                    <div className="routine-label-saved-exercises-add-exercise">
                        <div className="routine-save-delete-sign">
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
                                    <p onClick={handleNameClick}>{routineName}</p>
                                )}
                            </div>

                            <div className="save-delete-sign">
                                <button
                                    type="button"
                                    className="save-button"
                                    //add handleSaveExercise
                                    onClick={() => {handleSaveExercise()}}
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
                                                        exerciseName={exercise.exerciseName}
                                                        time={exercise.time}
                                                        onDelete={handleDeleteExercise}
                                                        onTimeChange={handleTimeChange}
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
                        "right-container-workout-loginpage $ {showSearchBar ? 'hide' : ''}"}
                >
                    {!showSearchBar && (
                        <div className="right-container-workout-loginpage"></div>
                    )}
                    {showSearchBar && (
                        <>
                            <div className="searchbar-container show" style={{position: 'relative', width: '300px'}}>
                                <FaSearch className="search-icon"/>

                                <input
                                    type="text"
                                    placeholder="Search for an exercise..."
                                    value={inputtedExercises}
                                    onChange={(e) => handleChange(e.target.value)}
                                    className="search-input"
                                />
                                {results.length > 0 && (
                                    <ul className="dropdown-list">
                                        {results.map((exercise) => (
                                            <li key={exercise.id}
                                                onClick={() => { handleSelectedExercise(exercise.title,exercise.type);}}
                                            >
                                                {exercise.title}</li>
                                        ))}

                                    </ul>

                                )}

                            </div>

                        </>
                    )}

                </div>

            </div>
        </>
    );

}

export default Workoutloginpage;
