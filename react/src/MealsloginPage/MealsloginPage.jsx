import "../MealsloginPage/MealsloginPage.css";
import Header from "../Shared/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { getUserInfo } from "../Shared/API/Auth.js";
import ScrollToTop from "../Shared/Misc/ScrollToTop.jsx";

function Mealsloginpage() {
  const navigate = useNavigate();
  const { data: userInfo } = useQuery("userInfo", getUserInfo);

  const [recipeName, setRecipeName] = useState("");
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [serves, setServes] = useState(1);

  if (!userInfo) {
    navigate("/login", { replace: true });
  }

  const onIngredientAdd = () => {
    setRecipeIngredients([...recipeIngredients, currentIngredient]);
    setCurrentIngredient("");
  };

  const onIngredientDelete = (index) => {
    const newIngredients = recipeIngredients.filter((_, i) => i !== index);
    setRecipeIngredients(newIngredients);
  };

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
                      <option value="Flour"></option>
                      <option value="Eggs"></option>
                      <option value="Milk"></option>
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
                      step="0.5"
                      value={serves}
                      onChange={(e) => setServes(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="macros-wrapper">
                <div className="macros">Macros</div>
                <div className="macros-display">
                  <div className="macro-type">
                    <div className="macro-value">0</div>
                    <div className="macro-label">Calories</div>
                  </div>
                  <div className="macro-type">
                    <div className="macro-value">0g</div>
                    <div className="macro-label">Protein</div>
                  </div>
                  <div className="macro-type">
                    <div className="macro-value">0g</div>
                    <div className="macro-label">Carbs</div>
                  </div>
                  <div className="macro-type">
                    <div className="macro-value">0g</div>
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
              {recipeIngredients.map((ingredient, index) => (
                <li key={index}>
                  <div>
                    <p>{ingredient}</p>
                    <button onClick={() => onIngredientDelete(index)}>
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
