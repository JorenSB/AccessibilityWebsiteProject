import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';

import Layout from "../../AdminPortaalLayout.js";

import ExpertForm from './ExpertForm.js';
import AdminForm from './AdminForm.js';
import CompanyForm from './CompanyForm.js';

const CreateUser = () => {
  const { userType } = useParams();
  return (
    <Layout>
        <div className='row'>
          <div className='col-12 text-center'>
            <h1>{userType} aanmaken</h1>
          </div>
        </div>
        <div className='row'>
          <div className='container'>
            {
              userType === 'Deskundige' || userType === 'deskundige' ? <ExpertForm /> :
              userType === 'Admin' || userType === "admin" ? <AdminForm /> :
              userType === 'Bedrijf' || userType === 'bedrijf' ? <CompanyForm /> :
              <p className='text-center color-danger'>Geen formulier voor deze gebruiker gevonden</p>
            }
          </div>
        </div>
        
    </Layout>
     
  );
};

export default CreateUser;
