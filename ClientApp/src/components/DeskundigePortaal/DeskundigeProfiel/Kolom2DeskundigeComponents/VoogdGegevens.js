import React from 'react';
import './VoogdGegevens.css';


function VoogdGegevens (){

  return (
    <div className='voogdGegevensContainer'>
        <h2>Voogd gegevens</h2>
        <input type="text" name="naam" placeholder="Voogd Naam" required></input>
        <input type="date" name="birthdate" placeholder="Geboortedatum" required></input>
        <input type="email" name="email" placeholder="Voogd E-mail" required></input>
         <input type="tel" name="phonenumber" placeholder="Voogd Telefoonnummer" required></input>
  </div>

  );
};

export default VoogdGegevens;
