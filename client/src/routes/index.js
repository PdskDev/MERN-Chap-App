import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import HomePage from "../pages/HomePage";
import MessagePage from "../components/MessagePage";
import AppLayout from "../layout";
import ForgotPassword from "../pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: (
          <AppLayout>
            <RegisterPage />
          </AppLayout>
        ),
      },
      {
        path: "email",
        element: (
          <AppLayout>
            <CheckEmailPage />
          </AppLayout>
        ),
      },
      {
        path: "password",
        element: (
          <AppLayout>
            <CheckPasswordPage />
          </AppLayout>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <AppLayout>
            <ForgotPassword />
          </AppLayout>
        ),
      },
      {
        path: "",
        element: <HomePage />,
        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
