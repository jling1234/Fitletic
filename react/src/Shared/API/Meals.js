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

export async function deleteMeal(id) {
  const response = await axios.delete("http://localhost:8080/meals/" + id, {
    headers: { Authorization: "Bearer " + getToken() },
  });

  return response.data;
}

export function getNutrientAmount(ingredient, name, unit) {
  const get = (name) => {
    for (const nutrient of ingredient.nutrients) {
      if (nutrient.name === name && nutrient.unit === unit) {
        return nutrient.amount;
      }
    }

    return null;
  }

  let names = [];
  if (name === "Energy") {
    names = ["Energy (Atwater Specific Factors)", "Energy (Atwater General Factors)", "Energy"];
  } else if (name === "Carbohydrate") {
    names = ["Carbohydrate, by summation", "Carbohydrate, by difference"];
  } else if (name === "Fat") {
    names = ["Total fat (NLEA)", "Total lipid (fat)"];
  } else {
    names = [name];
  }

  const multiplier = Number(ingredient.count) / 100;

  for (const name of names) {
    const value = get(name);
    if (value) {
      return value * multiplier;
    }
  }

  return 0;
}