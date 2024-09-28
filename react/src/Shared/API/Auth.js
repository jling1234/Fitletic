import axios from "axios";
import {getToken, setToken} from "../LocalDetails/LocalDetails.jsx";
import {getAPIBaseUrl} from "./Env.js";

export async function getUserInfo() {
  try {
    const response = await axios.get(getAPIBaseUrl() + "/users/me", {
      headers: { Authorization: "Bearer " + getToken() },
    });

    return response.data;
  } catch (error) {
    if (error.status === 401 || error.status === 403) {
      return null;
    }

    throw error;
  }
}

export async function doesUserExist(username) {
  try {
    const response = await axios.get(getAPIBaseUrl() + "/users/exists/" + username);
    return response.data;
  } catch (error) {
    if (error.status === 401 || error.status === 403) {
      return null;
    }

    throw error;
  }
}