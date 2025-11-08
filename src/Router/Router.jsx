import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Issues from "../Pages/Issues";
import AddIssues from "../Pages/AddIssues";
import MyIssues from "../Pages/MyIssues";
import MyContribution from "../Pages/MyContribution";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/issues",
        Component: Issues,
      },
      {
        path: "/add-issues",
        element: (
          <PrivateRoute>
            <AddIssues></AddIssues>,
          </PrivateRoute>
        ),
      },
      {
        path: "/my-issues",
        element: (
          <PrivateRoute>
            <MyIssues></MyIssues>,
          </PrivateRoute>
        ),
      },
      {
        path: "/my-contribution",
        element: (
          <PrivateRoute>
            <MyContribution></MyContribution>,
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);

export default router;
