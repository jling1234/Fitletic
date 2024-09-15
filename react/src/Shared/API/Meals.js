import axios from "axios";

export async function getIngredients() {
  const response = await axios.get("http://localhost:8080/meals/ingredients");

  return response.data;
}
