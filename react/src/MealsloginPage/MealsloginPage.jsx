import "../MealsloginPage/MealsloginPage.css";
import Header from "../Shared/Header/Header";
import {Link, useNavigate} from "react-router-dom";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {useQuery} from "react-query";
import {getUserInfo} from "../Shared/API/Auth.js";
import ScrollToTop from "../Shared/Misc/ScrollToTop.jsx";

function Mealsloginpage() {
    const navigate = useNavigate();

    const { data: userInfo } = useQuery("userInfo", getUserInfo);

    if (!userInfo) {
        navigate("/login", { replace: true });
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
                    <div className="left-side-content">
                        <div className="Meal-name">
                            <div className="Meal-label">
                                <p>Chicken Tikka Masala</p>
                            </div>
                            <div className="save-delete-sign-mlp">
                                <button
                                    type="button"
                                    className="save-button"
                                    onClick={() => alert("Recipe Saved!")}
                                ></button>
                                <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => alert("Recipe Deleted!")}
                                ></button>
                            </div>
                        </div>
                        <div className="meal-info-container">
                            <div className="input-group">
                                <div className="meal-type">
                                    <p>Meal Type</p>
                                    <div className="meal-type-dropdown">
                                        <select className="dropdown">
                                            <option value="">Select</option>
                                            <option value="Breakfast">Breakfast</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="Dinner">Dinner</option>
                                            <option value="Snack">Snack</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="ingredients">
                                    <p>Ingredients</p>
                                    <div className="Ingredients-dropdown">
                                        <select className="dropdown">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="Servings">
                                    <p>Servings</p>
                                    <div className="Servings-dropdown">
                                        <select className="dropdown">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="macros">
                                Macros
                            </div>
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
                <div className="right-container-mlp">
                </div>
            </div>
        </>
    );
}

export default Mealsloginpage;