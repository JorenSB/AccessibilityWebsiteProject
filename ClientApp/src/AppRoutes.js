
import { Home } from "./components/Home";
import Example2 from "./components/layouts/Example";

const AppRoutes = [
  {
    index: true,
    element: <Example2 />
  },
  {
    path: "/test",
    element: <Home/>
  }
];

export default AppRoutes;
