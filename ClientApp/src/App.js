import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes';

import Login from './components/LoginPortaal/Login';
import RegisterCompany from './components/RegistreerPortaal/RegisterCompany';
import RegisterExpert from './components/RegistreerPortaal/RegisterExpert';
import TestPagina from './components/TestPagina';
import AppRoutes from './AppRoutes'; 

function App() {
  return (
      <Routes>
        {AppRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
            index={route.index}
          />
        ))}
      </Routes>
      // <Deskundige />
       
  );
}

export default App;