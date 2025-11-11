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
import IssueDetails from "../Pages/IssueDetails";
import Error from "../Pages/Error";

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
        path: "/issue-details/:id",
        loader: ({ params }) =>
          fetch(`https://assignment-10-server-xi-navy.vercel.app/issues/${params.id}`),
        element: (
          <PrivateRoute>
            <IssueDetails></IssueDetails>
          </PrivateRoute>
        ),
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
      {
        path: "*",
        Component: Error,
      },
    ],
  },
]);

export default router;
