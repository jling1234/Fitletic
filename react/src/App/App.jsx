import "./App.css";
import Homepage from "../Homepage/Homepage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage, SignUpPage } from "../LoginSignupPage/LoginSignupPage.jsx";
import Profilepage from "../Profilepage/Profilepage.jsx";
import Workoutspage from "../Workoutspage/Workoutspage.jsx";
import Workoutloginpage from "../Workoutloginpage/Workoutloginpage.jsx";
import Mealspage, {LogsPage} from "../MealsPage/MealsPage.jsx";
import Mealsloginpage from "../MealsloginPage/MealsloginPage.jsx";
import Savedworkoutspage from "../Savedworkoutspage/Savedworkoutspage.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Workouteditpage from "../WorkoutEditPage/Workouteditpage.jsx";

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
    path: "meals/logs",
    element: <LogsPage />
  }, {
    path: "mealslogin/:mealId?",
    element: <Mealsloginpage/>
  }, {
    path: "savedworkoutspage",
    element: <Savedworkoutspage />
  }, {
    path: "workouteditpage/:workoutId?", 
    element: <Workouteditpage />
  }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      cacheTime: 90000
    }
  }
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
