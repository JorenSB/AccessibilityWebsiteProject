import Login from "./components/login/Login.js";
import RegisterCompany from "./components/registreer/RegisterCompany.js";
import RegisterExpert from "./components/registreer/RegisterExpert.js";
import Deskundige from "./components/Deskundige.js"

const AppRoutes = [
  {
    index: true,
    element: <Login />
  },
  {
    path: "/registreerbedrijf",
    element: <RegisterCompany />
  },
  {
    path: "/registreerdeskundige",
    element: <RegisterExpert/>
  },
  {
    path: "/deskundige",
    element: <Deskundige/>
  }

];

export default AppRoutes;
