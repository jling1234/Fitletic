import "./App.css";
import Homepage from "../Homepage/Homepage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignupPage from "../LoginSignupPage/LoginSignupPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "login",
    element: <LoginSignupPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
