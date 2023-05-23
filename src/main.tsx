import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import Start from "./pages/Start/Start";
import Manual from "./pages/Manual/Manual";
import Result from "./pages/Result/Result";
import ErrorPage from "./pages/Error/ErrorPage";

import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <GoogleOAuthProvider clientId="227087509653-vebn36qaass89cpfm6q76n2ri0vevvtk.apps.googleusercontent.com">
            <Start />
          </GoogleOAuthProvider>
        ),
      },
      {
        path: "manual",
        element: <Manual />,
      },
      {
        path: "result",
        element: <Result />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<RouterProvider router={router} />);
