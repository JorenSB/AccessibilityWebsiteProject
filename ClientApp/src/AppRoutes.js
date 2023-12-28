import Login from "./components/Login.js";
import RegisterCompany from "./components/RegisterCompany.js";
import RegisterExpert from "./components/RegisterExpert.js";

const AppRoutes = [
  {
    index: true,
    element: <Login />
  },
  {
    path: "/registercompany",
    element: <RegisterCompany />
  },
  {
    path: "/registerexpert",
    element: <RegisterExpert/>
  }

];

export default AppRoutes;
