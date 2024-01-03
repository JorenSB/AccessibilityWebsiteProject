import Login from "./components/login/Login.js";
import RegisterCompany from "./components/registreer/RegisterCompany.js";
import RegisterExpert from "./components/registreer/RegisterExpert.js";
import Deskundige from "./components/Deskundige.js"
import Example2 from "./components/layouts/Example.js";

const AppRoutes = [
  {
    index: true,
    element: <Login />
  },
  // {
  //   index: true,
  //   element:<Example2/>
  // },
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
