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
import AdminPortaalProfiel from "./components/AdminPortaal/Profiel/AdminProfielView.js";
import AdminPortaalBedrijven from "./components/AdminPortaal/Bedrijven/BedrijvenView.js";
import AdminPortaalEditBedrijf from "./components/AdminPortaal/Bedrijven/BedrijfEditView";
import AdminPortaalExperts from "./components/AdminPortaal/Deskundige/ExpertsView";
import AdminPortaalEditExpert from "./components/AdminPortaal/Deskundige/ExpertEditView.js";
import CreateUser from "./components/AdminPortaal/component/Create/CreateUser.js";
import Example from "./components/AdminPortaal/Example.js";
import OnderzoekView from './components/Onderzoeken/OnderzoekView.js';

function App() {
  return (
    <Routes>
      {/* zet hier onder alle routes van de experts */}
      <Route element={<PrivateRoutes role={'Expert'} />}>
        <Route path='/deskundige' element={<Deskundige />} />
        <Route path='/deskundige/profiel/' element={<DeskundigeProfiel />} />
      </Route>
      {/* zet hier onder alle routes van de bedrijven */}
      <Route element={<PrivateRoutes role={'Company'} />}>
        <Route path='/company' element={<Company />} />
        <Route path='/company/profile' element={<CompanyProfile />} />
        {/* <Route path='/onderzoek/start' element={<OnderzoekStart />} /> */}
        <Route path='/company/:CompanyID/onderzoek/:studyID' element={<OnderzoekView />} />
      </Route>

      {/* zet hieronder alle routes van de admins */}
      <Route element={<PrivateRoutes role={'Admin'} />}>
        <Route path='/admin/profiel' element={<AdminPortaalProfiel />} />

        <Route path='/admin/bedrijven' element={<AdminPortaalBedrijven />} />
        <Route path='/admin/bedrijven/:id' element={<AdminPortaalEditBedrijf />} />

        <Route path='/admin/deskundigen' element={<AdminPortaalExperts />} />
        <Route path='/admin/deskundigen/:id' element={<AdminPortaalEditExpert />} />

        <Route path='/admin/aanmaken/:userType' element={<CreateUser />} />
      </Route>

      <Route path='/admin/example' element={<Example />} />

      {/* dit zijn publieke routes */}
      <Route path='/' element={<Login />} />
      <Route path='/registreerbedrijf' element={<RegisterCompany />} />
      <Route path='/registreerdeskundige' element={<RegisterExpert />} />
    </Routes>
  );
}

export default App;