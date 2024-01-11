import Login from "./components/LoginPortaal/Login.js";
import RegisterCompany from "./components/RegistreerPortaal/RegisterCompany.js";
import RegisterExpert from "./components/RegistreerPortaal/RegisterFormExpert.js";
import Deskundige from './components/DeskundigePortaal/Deskundige.js';

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
  },
  {
    path: "/deskundige",
    element: <Deskundige />
  }

];

export default AppRoutes;
