import "./App.css";
import Homepage from "../Homepage/Homepage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage, SignUpPage } from "../LoginSignupPage/LoginSignupPage.jsx";
import Profilepage from "../Profilepage/Profilepage.jsx";
import Workoutspage from "../Workoutspage/Workoutspage.jsx";
import Workoutloginpage from "../Workoutloginpage/Workoutloginpage.jsx";
import Mealspage from "../MealsPage/MealsPage.jsx";
import Mealsloginpage from "../MealsloginPage/MealsloginPage.jsx";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignUpPage />,
  }, {
    path: "profile",
    element: <Profilepage />
  }, {
    path: "workout",
    element: <Workoutspage />
  }, {
    path: "workoutlogin",
    element: <Workoutloginpage/>
  }, {
    path: "meals",
    element: <Mealspage />
  }, {
    path: "mealslogin",
    element: <Mealsloginpage/>
  }
]);

function App() {
  return (
  
      <RouterProvider router={router}></RouterProvider> 
    
   
  );
}

export default App;
