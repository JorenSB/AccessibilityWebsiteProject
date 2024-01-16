import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes';
import Login from './components/LoginPortaal/Login';
import RegisterCompany from './components/RegistreerPortaal/RegisterCompany';
import RegisterExpert from './components/RegistreerPortaal/RegisterExpert';
import Deskundige from './components/DeskundigePortaal/Deskundige';
import DeskundigeProfiel from './components/DeskundigePortaal/DeskundigeProfiel';
import Company from './components/CompanyPortal/Company';
import CompanyProfile from './components/CompanyPortal/CompanyProfile';
import TestPagina from './components/TestPagina';


function App() {
  return (

    <Routes>
      {/* zet hier onder alle routes van de experts */}
      <Route element={<PrivateRoutes role={'Expert'} />}>
        <Route path='/deskundige' element={<Deskundige />} />
        <Route path='/deskundigeprofiel/:jwt' element={<DeskundigeProfiel />} />
      </Route>
      {/* zet hier onder alle routes van de bedrijven */}
      <Route element={<PrivateRoutes role={'Company'} />}>
        <Route path='/company' element={<Company />} />
        <Route path='/companyprofile/:jwt' element={<CompanyProfile />} />
      </Route>

      {/* zet hieronder alle routes van de admins */}
      <Route element={<PrivateRoutes role={'Admin'} />}>
        {/* <Route path='' element={<TestPagina/>} /> */}
      </Route>

      {/* dit zijn publieke routes */}
      <Route path='/' element={<Login />} />
      <Route path='/registreerbedrijf' element={<RegisterCompany />} />
      <Route path='/registreerdeskundige' element={<RegisterExpert />} />

    </Routes>

  );
}

export default App;