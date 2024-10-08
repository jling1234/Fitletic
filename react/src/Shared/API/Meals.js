import axios from "axios";
import {getToken} from "../LocalDetails/LocalDetails.jsx";
import {getAPIBaseUrl} from "./Env.js";

export async function getIngredients() {
  const response = await axios.get(getAPIBaseUrl() + "/meals/ingredients");

  return response.data;
}

export async function getMeals() {
  const response = await axios.get(getAPIBaseUrl() + "/meals", {
    headers: { Authorization: "Bearer " + getToken() },
  });

  return response.data;
}

export async function getMeal(id) {
  if (!id || id === "0") {
    return null;
  }

  try {
    const response = await axios.get(getAPIBaseUrl() + "/meals/" + id, {
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

  const response = await axios.put(getAPIBaseUrl() + "/meals/" + id, meal, {
    headers: { Authorization: "Bearer " + getToken() },
  });

  return response.data;
}

export async function deleteMeal(id) {
  const response = await axios.delete(getAPIBaseUrl() + "/meals/" + id, {
    headers: { Authorization: "Bearer " + getToken() },
  });

  return response.data;
}

export async function logMeal(id) {
  const response = await axios.post(getAPIBaseUrl() + "/meals/log/" + id, null,{
    headers: { Authorization: "Bearer " + getToken() },
  });

  return response.data;
}

export async function deleteLoggedMeal(id) {
  const response = await axios.delete(getAPIBaseUrl() + "/meals/log/" + id,{
    headers: { Authorization: "Bearer " + getToken() },
  });

  return response.data;
}

export async function getAllLoggedMeals() {
  const response = await axios.get(
    getAPIBaseUrl() + "/meals/log/all",
    {
      headers: { Authorization: "Bearer " + getToken() },
    },
  );

  return response.data;
}

export async function getLoggedMealsToday() {
  // Get the current date
  const now = new Date();

  // Set the time to 00:00:00
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const startOfDayEpoch = Math.floor(startOfDay.getTime() / 1000);

  // Set the time to 23:59:59
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));
  const endOfDayEpoch = Math.floor(endOfDay.getTime() / 1000);

  const response = await axios.get(
    getAPIBaseUrl() + `/meals/log?from=${startOfDayEpoch}&to=${endOfDayEpoch}`,
    {
      headers: { Authorization: "Bearer " + getToken() },
    },
  );

  return response.data;
}

export function getLoggedCaloriesFromAllMeals(loggedMeals) {
  let calories = 0;
  if (loggedMeals) {
    for (const loggedMeal of loggedMeals) {
      calories += getLoggedCalories(loggedMeal);
    }
  }
  return  Number(calories.toFixed(0));
}

export function getLoggedCalories(loggedMeal) {
  let mealCalories = 0;
  for (const ingredient of loggedMeal.meal.ingredients) {
    const adjustedIngredient = {
      ...ingredient.ingredient,
      count: ingredient.count,
    };
    mealCalories += getNutrientAmount(adjustedIngredient, "Energy", "kcal");
  }
  const servesSafe =
    loggedMeal.meal.servings > 0 ? loggedMeal.meal.servings : 1;

  mealCalories = mealCalories / servesSafe;
  return Number(mealCalories.toFixed(2));
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