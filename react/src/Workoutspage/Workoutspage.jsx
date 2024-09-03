import { Footer } from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import "../Workoutspage/Workoutspage.css";
import { Link } from "react-router-dom";
import "./Assets/workoutsimg.png";

export function RoutineInputFieldRow() {
  return (
    <>
      <div className="routines-input-fields-row">
        <input type="text" />
        <input type="text" />
      </div>
    </>
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
              <div className="burntcal-tracker">
                <h1>2000  KCAL </h1>
                <h6> burnt from workout</h6>
                
              </div>
              <div className="workoutlog">
                <button
                  type="button"
                  onClick={() => alert("You have logged a workout!")}
                >
                  <p>Log a Workout</p>
                </button>
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
          <RoutineInputFieldRow />
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
