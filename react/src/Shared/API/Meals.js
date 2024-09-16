import axios from "axios";
import {getToken} from "../LocalDetails/LocalDetails.jsx";

export async function getIngredients() {
  const response = await axios.get("http://localhost:8080/meals/ingredients");

  return response.data;
}

export async function getMeals() {
  const response = await axios.get("http://localhost:8080/meals", {
    headers: { Authorization: "Bearer " + getToken() },
  });

  return response.data;
}

export async function getMeal(id) {
  if (!id || id === "0") {
    return null;
  }

  try {
    const response = await axios.get("http://localhost:8080/meals/" + id, {
      headers: { Authorization: "Bearer " + getToken() },
    });

    return response.data;
  } catch (e) {
    if (e.status === 404) {
      return null;
    }
    throw e;
  }
}

export async function saveMeal(meal, id) {
  if (!id) {
    id = "";
  }

  const response = await axios.put("http://localhost:8080/meals/" + id, meal, {
    headers: { Authorization: "Bearer " + getToken() },
  });

  return response.data;
}