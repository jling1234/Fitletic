import axios from "axios";
import {getToken} from "../LocalDetails/LocalDetails.jsx";
import {getAPIBaseUrl} from "./Env.js";

export async function getWorkouts () {

        const response = await axios.get(
            getAPIBaseUrl()+"/workout/getWorkouts",
            {
                headers: { Authorization: "Bearer " + getToken()},
            }
        ); 
        console.log(response.data);
        return response.data;
}

export async function getLoggedWorkoutResponses () {
    const response = await axios.get(getAPIBaseUrl()+"/logged/get", {
        headers: { Authorization: "Bearer " + getToken()},
    }
);
return response.data;
}

export async function saveLoggedWorkoutResponse (workoutId) {
    const response = await axios.post(getAPIBaseUrl()+"/logged/save/" + workoutId, null,
{
    headers: { Authorization: "Bearer " + getToken()},
}
);
console.log(response.data)
return response.data;
}

export async function deleteWorkout (workoutId) {
    const response = await axios.post(getAPIBaseUrl()+"/workout/delete?workoutId=" + workoutId, null,
    {
        headers: { Authorization: "Bearer " + getToken()},
    });
    return response.data;
}

export async function getWorkoutName (workoutId) {
const response = await axios.get(getAPIBaseUrl()+"/workout/get/" + workoutId,
    {
    headers: { Authorization: "Bearer " + getToken()},
});
console.log(response.data);
return response.data;
}

export async function fetchUserExercises(workoutId){
    const response = await axios.get(
        getAPIBaseUrl()+"/userExercise/get/" + workoutId,
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
)
console.log(response.data);
return response.data;
}
