import React from 'react';
import './Onderzoek.css';

const Onderzoek = () => {
  return (
   
      <div className='onderzoek'>
        <div className='upperhalf'>
            <div className='imageItem'>
                <img src="#" alt="foto van het contact persoon" />
            </div> 
            <div className='infoItem'>
                <h1>Titel onderzoek</h1>
                <h1>Naam bedrijf</h1>
            </div>
        </div>
        <div className='lowerhalf'>
            <h1>Status</h1>
            <h1><a href='#'>Bekijk onderzoek</a></h1>
        </div>
      </div>
  );
};

export default Onderzoek;
