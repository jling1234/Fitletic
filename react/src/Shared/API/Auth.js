import axios from "axios";
import {getToken, setToken} from "../LocalDetails/LocalDetails.jsx";
import {useQueryClient} from "react-query";

export async function getUserInfo() {
  try {
    const response = await axios.get("http://localhost:8080/users/me", {
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