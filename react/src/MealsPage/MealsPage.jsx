import FooterWithWaves from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import "../MealsPage/MealsPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserInfo } from "../Shared/API/Auth.js";
import { useEffect, useRef, useState } from "react";
import {
  deleteMeal,
  getAllLoggedMeals,
  getLoggedCalories,
  getIngredients,
  getLoggedMealsToday,
  getMeals,
  getNutrientAmount,
  logMeal, deleteLoggedMeal, getLoggedCaloriesFromAllMeals
} from "../Shared/API/Meals.js";
import PropTypes from "prop-types";

function DeleteMealDialog({ meal, deleteMealDialogRef, deleteMealCallback }) {
  const closeDialog = () => {
    deleteMealDialogRef.current.close();
  };

  return (
    <dialog className="delete-meal-dialog" ref={deleteMealDialogRef}>
      <div className="dialog-content-wrapper">
        <div className="dialog-header">
          <h2>Delete Meal</h2>
          <button className="dialog-close-button" onClick={closeDialog}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
        <div className="dialog-content">
          <p>
            Are you sure you want to delete the meal &apos;{meal.name}&apos;?
          </p>
          <p>
            This action cannot be undone, and any calories logged will be
            removed.
          </p>
        </div>
        <div className="dialog-button-wrapper">
          <button
            onClick={deleteMealCallback}
            className="dialog-confirm-button"
          >
            Confirm
          </button>
          <button onClick={closeDialog}>Cancel</button>
        </div>
      </div>
    </dialog>
  );
}

DeleteMealDialog.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    servings: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        ingredientId: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  deleteMealDialogRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  deleteMealCallback: PropTypes.func.isRequired,
};

export function MakeNewRecipeButton() {
  return (
    <>
      <Link to={"/mealslogin"}>
        <button type="button" className="make-a-new-recipe-button">
          Make A New Recipe
        </button>
      </Link>
    </>
  );
}

function MealCard({ meal, ingredients }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMealDialogRef = useRef(null);

  const deleteMealMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteMeal(id);
    },
    onSuccess: async (id) => {
      await queryClient.invalidateQueries(["meal", id]);
      await queryClient.invalidateQueries("meals");
      await queryClient.invalidateQueries("loggedMeals");
      await queryClient.invalidateQueries("allLoggedMeals");
    },
  });

  const onDeleteMeal = async () => {
    deleteMealDialogRef.current.showModal();
  };

  const logMealMutation = useMutation({
    mutationFn: async (id) => {
      return await logMeal(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("loggedMeals");
      await queryClient.invalidateQueries("allLoggedMeals");
    },
  });

  const onLogMeal = async () => {
    await logMealMutation.mutate(meal.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCalories = (meal) => {
    let calories = 0;
    for (const ingredient of ingredients) {
      for (const mealIngredient of meal.ingredients) {
        if (mealIngredient.ingredientId === ingredient.id) {
          calories += getNutrientAmount(
            { ...ingredient, count: mealIngredient.count },
            "Energy",
            "kcal"
          );
        }
      }
    }

    const servesSafe = meal.servings > 0 ? meal.servings : 1;
    return calories / servesSafe;
  };

  return (
    <div className="saved-meals">
      <DeleteMealDialog
        meal={meal}
        deleteMealDialogRef={deleteMealDialogRef}
        deleteMealCallback={async () =>
          await deleteMealMutation.mutate(meal.id)
        }
      />

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
        <button type="button" onClick={onDeleteMeal}>
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
        <button type="button" onClick={onLogMeal}>
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
}

MealCard.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    servings: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        ingredientId: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function MyMeals({ divRef }) {
  const { data: meals } = useQuery("meals", getMeals);
  const { data: ingredients } = useQuery("ingredients", getIngredients);

  const [searchTerm, setSearchTerm] = useState("");

  let filteredMeals = [];
  if (meals) {
    filteredMeals = meals.filter((meal) =>
      meal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div ref={divRef} className="bottompage-container-mp">
      <div className="my-meals-heading">
        <h2>MY MEALS</h2>
        <MakeNewRecipeButton />
      </div>
      <div className="meal-search-wrapper">
        <label className="visuallyhidden" htmlFor="meal-search">
          Search Meals:
        </label>
        <input
          type="text"
          id="meal-search"
          placeholder="Search for a meal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
      </div>
      <ul className="saved-meals-flex-container">
        {ingredients &&
          filteredMeals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              ingredients={ingredients}
            ></MealCard>
          ))}
      </ul>
    </div>
  );
}

MyMeals.propTypes = {
  divRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

function DateLogCard({ date, loggedMeals }) {
  const queryClient = useQueryClient();

  const deleteLoggedMealMutation = useMutation({
    mutationFn: async (id) => {
      return await deleteLoggedMeal(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("loggedMeals");
      await queryClient.invalidateQueries("allLoggedMeals");
    },
  });

  const timeFormat = new Intl.DateTimeFormat("en-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="my-logs-card">
      <h3>{date}</h3>
      <ul className="my-logs-card-list">
        {loggedMeals.toReversed().map((loggedMeal, index) => {
          const date = new Date(loggedMeal.loggedAtEpochSecond * 1000);

          return (
            <li key={loggedMeal.id}>
              <p className="my-logs-calories">
                {getLoggedCalories(loggedMeal)} kcal
              </p>
              <p className="my-logs-meal-name">{loggedMeal.meal.name}</p>
              <p className="my-logs-time">{timeFormat.format(date)}</p>
              <button
                onClick={async () => 
                  await deleteLoggedMealMutation.mutate(loggedMeal.id)
                }
                className="my-logs-delete-button"
                type="button"
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MyLogs({ divRef }) {
  const { data: allLoggedMeals } = useQuery(
    "allLoggedMeals",
    getAllLoggedMeals
  );

  const transformedMeals = {};
  const dates = [];

  if (allLoggedMeals) {
    const format = new Intl.DateTimeFormat("en-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    for (const loggedMeal of allLoggedMeals) {
      const date = new Date(loggedMeal.loggedAtEpochSecond * 1000);
      let formattedDate = null;
      if (date.toDateString() === today.toDateString()) {
        formattedDate = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        formattedDate = "Yesterday";
      } else {
        formattedDate = format.format(date);
      }

      if (formattedDate in transformedMeals) {
        transformedMeals[formattedDate].push(loggedMeal);
      } else {
        transformedMeals[formattedDate] = [loggedMeal];
        dates.push(formattedDate);
      }
    }
  }

  return (
    <div ref={divRef} className="bottompage-container-mp">
      <div className="my-logs-heading">
        <h2>MY LOGGED MEALS</h2>
      </div>
      <ul className="my-logs-container">
        {dates.map((date) => {
          return (
            <li key={date}>
              <DateLogCard date={date} loggedMeals={transformedMeals[date]} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

MyLogs.propTypes = {
  divRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

function LogAMealButton({ headerRef, contentRef, text }) {
  return (
    <button
      type="button"
      onClick={() => {
        const customOffset = 10;
        const headerOffset = headerRef.current.offsetHeight;
        const elementPosition = contentRef.current.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.scrollY - headerOffset - customOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }}
    >
      <p>{text}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#ffffff"
      >
        <path d="M440-120q-75 0-140.5-28T185-225q-49-49-77-114.5T80-480q0-75 28-140.5T185-735q49-49 114.5-77T440-840q21 0 40.5 2.5T520-830v82q-20-6-39.5-9t-40.5-3q-118 0-199 81t-81 199q0 118 81 199t199 81q118 0 199-81t81-199q0-11-1-20t-3-20h82q2 11 2 20v20q0 75-28 140.5T695-225q-49 49-114.5 77T440-120Zm112-192L400-464v-216h80v184l128 128-56 56Zm168-288v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z" />
      </svg>
    </button>
  );
}

function Mealspage({ showLogs }) {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const headerRef = useRef(null);

  const { data: userInfo, isLoading: userInfoIsLoading } = useQuery(
    "userInfo",
    getUserInfo
  );

  useEffect(() => {
    if (!userInfoIsLoading && !userInfo) {
      navigate("/login", { replace: true });
    }
  }, [navigate, userInfo, userInfoIsLoading]);

  const { data: loggedMeals } = useQuery("loggedMeals", getLoggedMealsToday);

  const calories = getLoggedCaloriesFromAllMeals(loggedMeals);

  return (
    <>
      <Header headerRef={headerRef} />
      <div className="toppage-container-mp">
        <div className="mealspage-image-container">
          <div className="accessories-container-mp">
            <div className="meals-label">
              <h1>MEALS</h1>
            </div>
            <div className="KcalGained-tracker-and-mealslog">
              <div className="KcalGained-tracker">
                <h1>{calories} KCAL </h1>
                <h6> gained today</h6>
              </div>
              <div className="Mealslog">
                {!showLogs && (
                  <button type="button" onClick={() => navigate("/meals/logs")}>
                    <p>View Logs</p>
                  </button>
                )}
                {showLogs && (
                  <button type="button" onClick={() => navigate("/meals")}>
                    <p>View Meals</p>
                  </button>
                )}
                <LogAMealButton
                  text={showLogs ? "Manage my Logs" : "Log a Meal"}
                  headerRef={headerRef}
                  contentRef={contentRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLogs ? (
        <MyLogs divRef={contentRef} />
      ) : (
        <MyMeals divRef={contentRef} />
      )}

      <FooterWithWaves />
    </>
  );
}

Mealspage.propTypes = {
  showLogs: PropTypes.bool,
};

export function LogsPage() {
  return <Mealspage showLogs={true}></Mealspage>;
}

export default Mealspage;
