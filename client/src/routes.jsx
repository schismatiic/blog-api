import App from "./App";
import Home from "./pages/Home";
import Post from "./components/Post";
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
        path: "about",
        element: <About />,
      },
    ],
  },
];

export default routes;
