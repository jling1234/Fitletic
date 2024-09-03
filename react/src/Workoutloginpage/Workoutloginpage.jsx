import "../Workoutloginpage/Workoutloginpage.css";
import Header from "../Shared/Header/Header";
import {Link} from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

/*export function Exercise({ exerciseNumber }) {
  return (
    <>
      <div className="added-exercise">
        <p>Exercise {exerciseNumber} </p>
        <input type="text" placeholder="Name: def" />
      </div>
    </>
  );
}*/

// eslint-disable-next-line react/prop-types
export function AddAnExerciseButton({onClick}) {

  return (
    <div className="add-an-exercise-container">
      <button type="button" onClick={onClick}>
        <p>Add an Exercise</p>
      </button>
    </div>
  );
}

function Workoutloginpage() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleAddAnExerciseClick = () => {
    setShowSearchBar(true);
  };


    const[exercises, setExercises]=useState("");
  // eslint-disable-next-line no-unused-vars
    const [results,setResults]=useState([]);
  const fetchData = (value) => {
    fetch("http://localhost:8080/exercise")
        .then((response) => response.json())
        .then((json) => {
          if (Array.isArray(json)) {
            const results = json.filter((exercises) => {
              return (
                  value &&
                  exercises &&
                  exercises.title &&
                  exercises.title.toLowerCase().includes(value.toLowerCase())
              );
            });
            console.log(results);
          setResults(results);
          }
        })
        .catch((error) => console.error('Error:', error));
  };

  const handleChange = (value)=>{
    setExercises(value);
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
                  onClick={() => alert("You have just deleted a workout!")}
                ></button>
              </div>
            </div>
            <div className="saved-exercises-add-exercise-container">
              <div className="saved-exercises">
                <form>
                  {/*Exercise List */}
                  <AddAnExerciseButton onClick={handleAddAnExerciseClick} />
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
          {showSearchBar && (
            <div className="searchbar-container show"  style={{ position: 'relative', width: '300px' }}>
              <FaSearch if="search-icon" />
              <input
                type="text"
                placeholder="Search for an exercise..."
                value={exercises}
                onChange={(e)=> handleChange(e.target.value)}
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
