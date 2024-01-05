import Login from "./components/LoginPortaal/Login.js";
import RegisterCompany from "./components/RegistreerPortaal/RegisterCompany.js";
import RegisterExpert from "./components/RegistreerPortaal/RegisterExpert.js";
import Deskundige from "./components/DeskundigePortaal/Deskundige.js";

import AdminPortaal_Bedrijven from "./components/AdminPortaal/Bedrijven/BedrijvenView.js";

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
  },
  {
    path: "/admin/bedrijven",
    element: <AdminPortaal_Bedrijven/>
  },
  {
    path: "/admin/deskundigen",
    element: <Deskundige/>
  },

];

export default AppRoutes;
