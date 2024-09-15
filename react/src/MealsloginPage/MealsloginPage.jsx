import "../MealsloginPage/MealsloginPage.css";
import Header from "../Shared/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import { useQuery } from "react-query";
import { getUserInfo } from "../Shared/API/Auth.js";
import ScrollToTop from "../Shared/Misc/ScrollToTop.jsx";
import { getIngredients } from "../Shared/API/Meals.js";
import * as PropTypes from "prop-types";

function RecipeIngredient({ recipeIngredient, onChange, onDelete }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.style.width = (inputRef.current.value.toString().length + 3) + "ch";
  }, []);

  const onChangeWithWidthUpdate = (e) => {
    onChange(e);
    e.target.style.width = `${e.target.value.length + 3}ch`;
  }

  return (
    <div className="recipe-ingredient">
      <div className="ingredient-amount-wrapper">
        <input
          className="ingredient-amount"
          type="number"
          value={recipeIngredient.count}
          step={50}
          ref={inputRef}
          onChange={onChangeWithWidthUpdate}
        />
        <p>g</p>
      </div>
      <p>{recipeIngredient.description}</p>
      <button onClick={onDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </button>
    </div>
  );
}

RecipeIngredient.propTypes = {
  recipeIngredient: PropTypes.any,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onDelete: PropTypes.func
};

function Mealsloginpage() {
  const navigate = useNavigate();

  const { data: userInfo, isLoading: userInfoIsLoading } = useQuery(
    "userInfo",
    getUserInfo,
  );

  const [recipeName, setRecipeName] = useState("");
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [serves, setServes] = useState(1);

  useQuery("ingredients", getIngredients, {
    onSuccess: (data) => {
      const sortedIngredients = data.sort((a, b) =>
        a.description.localeCompare(b.description),
      );
      setIngredients(sortedIngredients);
    },
  });

  useEffect(() => {
    if (!userInfoIsLoading && !userInfo) {
      navigate("/login", { replace: true });
    }
  }, [navigate, userInfo, userInfoIsLoading]);

  const onIngredientAdd = () => {
    for (const ingredient of ingredients) {
      if (ingredient.description === currentIngredient) {
        setRecipeIngredients([
          ...recipeIngredients,
          { ...ingredient, count: 100 },
        ]);
        setCurrentIngredient("");
        return;
      }
    }
  };

  const onIngredientDelete = (index) => {
    const newIngredients = recipeIngredients.filter((_, i) => i !== index);
    setRecipeIngredients(newIngredients);
  };

  const getNutrientAmount = (ingredient, name, unit) => {
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

  const macros = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  }

  for (const ingredient of recipeIngredients) {
    macros.calories += getNutrientAmount(ingredient, "Energy", "kcal");
    macros.protein += getNutrientAmount(ingredient, "Protein", "g")
    macros.carbs += getNutrientAmount(ingredient, "Carbohydrate", "g")
    macros.fat += getNutrientAmount(ingredient, "Fat", "g")
  }

  for (const [key, value] of Object.entries(macros)) {
    macros[key] = value / serves;
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="meals-loginpage-container">
        <div className="left-container-mlp">
          <Link to={"/meals"} className="back-arrow">
            🡨
          </Link>
          <div className="recipes-header">
            <h2>Recipe</h2>
            <button
              type="button"
              className="save-button"
              onClick={() => alert("Recipe Saved!")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#000000"
              >
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
              </svg>
            </button>
          </div>
          <div className="left-side-content">
            <div className="meal-info-container">
              <div className="recipe-wrapper">
                <div className="input-group">
                  <div className="recipe">
                    <label htmlFor="recipe-name">Name</label>
                    <input
                      type="text"
                      id="recipe-name"
                      name="recipe-name"
                      value={recipeName}
                      onChange={(e) => setRecipeName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="ingredients">
                    <label htmlFor="ingredients">Ingredients</label>
                    <input
                      list="ingredients-list"
                      id="ingredients"
                      name="ingredients"
                      value={currentIngredient}
                      onChange={(e) => setCurrentIngredient(e.target.value)}
                    />
                    <datalist id="ingredients-list">
                      {ingredients &&
                        ingredients.map((ingredient) => {
                          return (
                            <option
                              key={ingredient.id}
                              value={ingredient.description}
                            ></option>
                          );
                        })}
                    </datalist>
                    <button type="button" onClick={onIngredientAdd}>
                      Add
                    </button>
                  </div>
                </div>
                <div className="input-group">
                  <div className="serves">
                    <label htmlFor="serves">Serves</label>
                    <input
                      type="number"
                      id="serves"
                      name="serves"
                      min="1"
                      value={serves}
                      onChange={(e) => setServes(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="macros-wrapper">
                <div className="macros">Macros (per serving)</div>
                <div className="macros-display">
                  <div className="macro-type">
                    <div className="macro-value">{+macros.calories.toFixed(2)} kcal</div>
                    <div className="macro-label">Calories</div>
                  </div>
                  <div className="macro-type">
                    <div className="macro-value">{+macros.protein.toFixed(2)} g</div>
                    <div className="macro-label">Protein</div>
                  </div>
                  <div className="macro-type">
                    <div className="macro-value">{+macros.carbs.toFixed(2)} g</div>
                    <div className="macro-label">Carbs</div>
                  </div>
                  <div className="macro-type">
                    <div className="macro-value">{+macros.fat.toFixed(2)} g</div>
                    <div className="macro-label">Fat</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {recipeIngredients.length === 0 ? (
          <div className="right-container-mlp"></div>
        ) : (
          <div className="right-container-ingredients">
            <h3>Ingredients</h3>
            <ul className="ingredient-list">
              {recipeIngredients.map((recipeIngredient, index) => (
                <li key={recipeIngredient.id}>
                  <RecipeIngredient
                    recipeIngredient={recipeIngredient}
                    onChange={(e) => {
                      const newIngredients = [...recipeIngredients];
                      newIngredients[index].count = e.target.value;
                      setRecipeIngredients(newIngredients);
                    }}
                    onDelete={() => onIngredientDelete(index)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Mealsloginpage;
