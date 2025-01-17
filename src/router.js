import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import MedicineDashboard from "./components/MedicineDashboard";

const router = createBrowserRouter([
  { path: "login", element: <Login /> },
  { path: "/", element: <Signup /> },
  { path: "signup", element: <Signup /> },
  { path: "dashboard", element: <MedicineDashboard /> },
  // { path: "login", element: <Login /> },
]);

export default router;
