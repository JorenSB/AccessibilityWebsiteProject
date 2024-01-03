import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes'; 
import Deskundige from './components/Deskundige';
const App = () => {
  return (
      // <Routes>
      //   {AppRoutes.map((route, index) => (
      //     <Route
      //       key={index}
      //       path={route.path}
      //       element={route.element}
      //       index={route.index}
      //     />
      //   ))}
      // </Routes>
       <Deskundige/>
  );
};

export default App;

// import React, { Component } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import AppRoutes from './AppRoutes';
// import BaseLayout from './components/layouts/BaseLayout';
// import './custom.css';

// export default class App extends Component {
//   static displayName = App.name;

//   render() {
//     return (
//       <BaseLayout>
//         <Routes>
//           {AppRoutes.map((route, index) => {
//             const { element, ...rest } = route;
//             return <Route key={index} {...rest} element={element} />;
//           })}
//         </Routes>
//       </BaseLayout>
//     );
//   }
// }
