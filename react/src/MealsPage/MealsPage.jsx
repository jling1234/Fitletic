import FooterWithWaves  from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import "../MealsPage/MealsPage.css";
import {Link, useNavigate} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getUserInfo} from "../Shared/API/Auth.js";
import {useEffect} from "react";
import {deleteMeal, getIngredients, getMeals, getNutrientAmount, saveMeal} from "../Shared/API/Meals.js";

export function MakeNewRecipeButton() {
  return (
    <>
      <Link to={"/mealslogin"}>
        <button type="button" className="make-a-new-recipe-button">
          <p>Make A New Recipe</p>
        </button>
      </Link>
    </>
  );
}

function MyMeals() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: meals } = useQuery("meals", getMeals);
  const { data: ingredients } = useQuery("ingredients", getIngredients);

  const deleteMealMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteMeal(id);
    },
    onSuccess: async (id) => {
      await queryClient.invalidateQueries(["meal", id]);
      await queryClient.invalidateQueries("meals");
    }
  });

  const getCalories = (meal) => {
    let calories = 0;
    for (const ingredient of ingredients) {
      for (const mealIngredient of meal.ingredients) {
        if (mealIngredient.ingredientId === ingredient.id) {
          calories += getNutrientAmount({ ...ingredient, count: mealIngredient.count }, "Energy", "kcal");
        }
      }
    }

    const servesSafe = meal.servings > 0 ? meal.servings : 1;
    return calories / servesSafe;
  };

  return (
    <div className="bottompage-container-mp">
      <div className="my-meals-heading">
        <p>MY MEALS</p>
      </div>
      <div className="make-a-new-recipe-container">
        <MakeNewRecipeButton />
      </div>
      <ul className="saved-meals-flex-container">
        {ingredients &&
          meals &&
          meals.map((meal) => {
            return (
              <div key={meal.id} className="saved-meals">
                <div>
                  <p>{meal.name}</p>
                  <button
                    type="button"
                    onClick={() => navigate("/mealslogin/" + meal.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteMealMutation.mutate(meal.id)}
                  >
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
                <div>
                  <p className="meal-calorie-count">{getCalories(meal)} kcal</p>
                  <button type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M440-120q-75 0-140.5-28T185-225q-49-49-77-114.5T80-480q0-75 28-140.5T185-735q49-49 114.5-77T440-840q21 0 40.5 2.5T520-830v82q-20-6-39.5-9t-40.5-3q-118 0-199 81t-81 199q0 118 81 199t199 81q118 0 199-81t81-199q0-11-1-20t-3-20h82q2 11 2 20v20q0 75-28 140.5T695-225q-49 49-114.5 77T440-120Zm112-192L400-464v-216h80v184l128 128-56 56Zm168-288v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
      </ul>
    </div>
  );
}

function Mealspage() {
  const navigate = useNavigate();

  const { data: userInfo, isLoading: userInfoIsLoading } = useQuery(
    "userInfo",
    getUserInfo,
  );

  useEffect(() => {
    if (!userInfoIsLoading && !userInfo) {
      navigate("/login", { replace: true });
    }
  }, [navigate, userInfo, userInfoIsLoading]);

  return (
    <>
      <Header />
      <div className="toppage-container-mp">
        <div className="mealspage-image-container">
          <div className="accessories-container-mp">
            <div className="meals-label">
              <p>MEALS</p>
            </div>
            <div className="KcalGained-tracker-and-mealslog">
              <div className="KcalGained-tracker">
                <h1>2000 KCAL </h1>
                <h6> Gained from Meals</h6>
              </div>
              <div className="Mealslog">
                <button
                  type="button"
                  onClick={() => alert("You have logged in a Meal.")}
                >
                  <p>Log a Meal</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MyMeals />

      <FooterWithWaves />
    </>
  );
}

export default Mealspage;
