import "./App.css";
import Homepage from "../Homepage/Homepage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage, SignUpPage } from "../LoginSignupPage/LoginSignupPage.jsx";
import Profilepage from "../Profilepage/Profilepage.jsx";
import Workoutspage from "../Workoutspage/Workoutspage.jsx";
import Workoutloginpage from "../Workoutloginpage/Workoutloginpage.jsx";
import Savedworkoutspage from "../Savedworkoutspage/Savedworkoutspage.jsx";



import { QueryClient, QueryClientProvider } from "react-query";

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
    path: "savedworkoutspage",
    element: <Savedworkoutspage />
  }
]);

const queryClient = new QueryClient();

function App() {
  return (
  
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider> 
      </QueryClientProvider>
    
   
  );
}

export default App;
