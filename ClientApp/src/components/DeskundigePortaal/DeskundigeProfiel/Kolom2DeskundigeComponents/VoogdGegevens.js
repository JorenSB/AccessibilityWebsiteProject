import React, { useEffect, useState } from 'react';
import './VoogdGegevens.css';

function VoogdGegevens(props) {
  const [volwassen, setVolwassen] = useState(false);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const age = calculateAge(props.birthDate);
    setVolwassen(age >= 18);
  }, [props.birthDate]);

  useEffect(() => {
    const age = calculateAge(props.birthDateData);
    setVolwassen(age >= 18);
  }, [props.birthDateData]);

  return (
    <div className='voogdGegevensContainer'>
      {!volwassen && (
        <>
          <h2>Voogd gegevens</h2>
          <input type="text" name="naam" placeholder="Voogd Naam" required />
          <input type="date" name="birthdate" placeholder="Geboortedatum" required />
          <input type="email" name="email" placeholder="Voogd E-mail" required />
          <input type="tel" name="phonenumber" placeholder="Voogd Telefoonnummer" required />
        </>
      )}
    </div>
  );
}

export default VoogdGegevens;
