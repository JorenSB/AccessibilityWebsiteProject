import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes';

import Login from './components/LoginPortaal/Login';
import RegisterCompany from './components/RegistreerPortaal/RegisterCompany';
import RegisterExpert from './components/RegistreerPortaal/RegisterExpert';
import TestPagina from './components/TestPagina';
import DeskundigeProfiel from './components/DeskundigePortaal/DeskundigeProfiel';

import Deskundige from "./components/DeskundigePortaal/Deskundige.js"

import AdminPortaalProfiel from "./components/AdminPortaal/Profiel/AdminProfielView.js";
import AdminPortaalBedrijven from "./components/AdminPortaal/Bedrijven/BedrijvenView.js";
import AdminPortaalEditBedrijf from "./components/AdminPortaal/Bedrijven/BedrijfEditView";
import AdminPortaalExperts from "./components/AdminPortaal/Deskundige/ExpertsView";
import AdminPortaalEditExpert from "./components/AdminPortaal/Deskundige/ExpertEditView.js";

import Example from "./components/AdminPortaal/Example.js";


function App() {
  return (
      <Routes>
          {/* zet hier onder alle routes van de experts */}
          <Route element={<PrivateRoutes role={'Expert'} />}>
              <Route path='/deskundige' element={<Deskundige/>} />
              <Route path='/deskundigeprofiel/:jwt' element={<DeskundigeProfiel/>}/>
          </Route>
          {/* zet hier onder alle routes van de bedrijven */}
          <Route element={<PrivateRoutes role={'Company'} />}>
          <Route path='/test' element={<TestPagina/>} />
          </Route>

          {/* zet hieronder alle routes van de admins */}
          <Route element={<PrivateRoutes role={'Admin'} />}>
            <Route path='/admin/profiel' element={<AdminPortaalProfiel/>} />

            <Route path='/admin/bedrijven' element={<AdminPortaalBedrijven/>} />
            <Route path='/admin/bedrijven/:id' element={<AdminPortaalEditBedrijf/>} />

            <Route path='/admin/deskundigen' element={<AdminPortaalExperts/>} />
            <Route path='/admin/deskundigen/:id' element={<AdminPortaalEditExpert/>} />
          </Route>
          
          <Route path='/admin/example' element={<Example/>} />

          {/* dit zijn publieke routes */}
          <Route path='/' element={<Login/>}/>
          <Route path='/registreerbedrijf' element={<RegisterCompany/>}/>
          <Route path='/registreerdeskundige' element={<RegisterExpert/>}/>
<<<<<<< HEAD
      </Routes>
      
       
=======
          
        </Routes>
    
>>>>>>> dev
  );
}

export default App;