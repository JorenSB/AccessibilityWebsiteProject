import Login from "./components/LoginPortaal/Login.js";
import RegisterCompany from "./components/RegistreerPortaal/RegisterCompany.js";
import RegisterExpert from "./components/RegistreerPortaal/RegisterExpert.js";
import Deskundige from "./components/DeskundigePortaal/Deskundige.js";

import AdminPortaalBedrijven from "./components/AdminPortaal/Bedrijven/BedrijvenView.js";
import AdminPortaalEditBedrijf from "./components/AdminPortaal/Bedrijven/BedrijfEditView";

import AdminPortaalExperts from "./components/AdminPortaal/Deskundige/ExpertsView";
import AdminPortaalEditExpert from "./components/AdminPortaal/Deskundige/ExpertEditView.js";

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
    element: <AdminPortaalBedrijven/>
  },
  {
    path: "/admin/bedrijven/:id",
    element: <AdminPortaalEditBedrijf/>
  },

  {
    path: "/admin/deskundigen",
    element: <AdminPortaalExperts/>
  },
  {
    path: "/admin/deskundigen/:id",
    element: <AdminPortaalEditExpert/>
  },

];

export default AppRoutes;
