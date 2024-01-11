import React, {useEffect} from 'react';
import BaseLayout from '../layouts/BaseLayout.js';
import Onderzoek from '../Onderzoeken/Onderzoek.js';
import { jwtIsValid } from '../../Auth.js';
import { useNavigate } from 'react-router-dom';

import './Deskundige.css';

const Deskundige = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!jwtIsValid()){
      navigate('/');
    }

  },[]) 
  return (
   
        <BaseLayout>
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
        </BaseLayout>
  
  );
};

export default Deskundige;
