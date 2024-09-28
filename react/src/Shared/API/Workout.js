import axios from "axios";
import {getToken} from "../LocalDetails/LocalDetails.jsx";

export async function getWorkouts () {

        const response = await axios.get(
            "http://localhost:8080/workout/getWorkouts",
            {
                headers: { Authorization: "Bearer " + getToken()},
            }
        ); 
        console.log(response.data);
        return response.data;
}

export async function getLoggedWorkoutResponses () {
    const response = await axios.get("http://localhost:8080/logged/get", {
        headers: { Authorization: "Bearer " + getToken()},
    }
);
return response.data;
}

export async function saveLoggedWorkoutResponse (workoutId) {
    const response = await axios.post("http://localhost:8080/logged/save/" + workoutId, null,
{
    headers: { Authorization: "Bearer " + getToken()},
}
);
console.log(response.data)
return response.data;
}

export async function deleteWorkout (workoutId) {
    const response = await axios.post("http://localhost:8080/workout/delete?workoutId=" + workoutId, null,
    {
        headers: { Authorization: "Bearer " + getToken()},
    });
    return response.data;
}

export async function getWorkoutName (workoutId) {
const response = await axios.get("http://localhost:8080/workout/get/" + workoutId,
    {
    headers: { Authorization: "Bearer " + getToken()},
});
console.log(response.data);
return response.data;
}

export async function fetchUserExercises(workoutId){
    const response = await axios.get(
        "http://localhost:8080/userExercise/get/" + workoutId,
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
)
console.log(response.data);
return response.data;
}
