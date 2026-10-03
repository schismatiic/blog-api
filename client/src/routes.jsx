import App from "./App";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "posts/:postId",
        element: <Post />,
      },
      {
        path: "auth/register",
        element: <Register />,
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "users/profile",
        element: <Profile />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
];

export default routes;
