import React, {useEffect} from 'react';
import CompanyLayout from './CompanyLayout';
import Onderzoek from '../Onderzoeken/Onderzoek.js';
import { jwtIsValid } from '../../Auth.js';
import { useNavigate } from 'react-router-dom';

import './Company.css';

const Company = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!jwtIsValid()){
      navigate('/');
    }

  },[]) 
  return (
   
        <CompanyLayout>
        <div className='titleContainer'>
          <h1 className='titleOnderzoek'>Lopende Onderzoeken</h1>
        </div>
        <div className='onderzoekContainer'>
          <Onderzoek  />
          <Onderzoek />
          <Onderzoek />
          
        </div>
        <div className='titleContainer'>
          <h1 className='titleOnderzoek'>Afgeronde Onderzoeken</h1>
        </div>
        </CompanyLayout>
  
  );
};

export default Company;
