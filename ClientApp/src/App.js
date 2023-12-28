// App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes'; // Assuming you have a file with route configurations

const App = () => {
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
  );
};

export default App;
