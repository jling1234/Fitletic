import { Footer } from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import "../Workoutspage/Workoutspage.css";
import { Link } from "react-router-dom";

function Workoutspage() {
  return (
    <>
      <Header />
      <div className="flex-container-workoutspage">
        <div className="left-grid-container-workoutspage">
          <div className="workouts-heading">
            <p>WORKOUTS</p>
          </div>
          <div className="Cal-burnt-from-workout-container">
            <Link link to = {"/workoutlogin"}>
              <button
                type="button"
                className="Cal-burnt-from-workout-button"
                onClick={() => history.pushState()}
              >
                <p>Calories burnt from Workouts</p>
              </button>
            </Link>
          </div>
          <div className="Login-a-workout-container">
            <button
              type="button"
              className="login-a-workout-button"
              onClick={() => alert("Logged a workout!")}
            >
              <p>Login a Workout</p>
            </button>
          </div>
        </div>
        <div className="right-grid-container-workoutspage">
          <p>Something should come here</p>
        </div>
      </div>
      <div className="bottom-container-workoutspage">
        <div className="my-routines-label">
          <p>MY ROUTINES</p>
        </div>
        <div className="saved-routines-flexbox">
          <button type="button" className="saved-routine"></button>
          <button type="button" className="saved-routine"></button>
          <button type="button" className="saved-routine"></button>
          <button type="button" className="saved-routine"></button>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default Workoutspage;
