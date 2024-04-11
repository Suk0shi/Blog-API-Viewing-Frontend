import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import IndividualPost from "./components/IndividualPost";
import { useState } from 'react'
// import ErrorPage from "./ErrorPage";

const Router = () => {

  const [id, setId] = useState({});

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App setId={setId}/>,
      // errorElement: <ErrorPage />,
    },
    {
      path: "IndividualPost",
      element: <IndividualPost id={id}/>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;