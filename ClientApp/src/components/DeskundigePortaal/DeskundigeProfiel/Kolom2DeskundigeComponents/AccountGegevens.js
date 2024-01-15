import React from 'react';
import './AccountGegevens.css';


function AccountGegevens (props){
  const formatDateForInput = (dateString) => {
    if (!dateString) {
      return ''; // or handle it as needed
    }
  
    // Split the string using the "T" character and take the first part
    const datePart = dateString.split('T')[0];
  
    return datePart;
  };
  return (
    <div className='accountGegevensContainer'>
        <h2>Uw account gegevens</h2>
        <input type="email" name="email" placeholder={props.email} ></input>
        <input type="password" name="password" placeholder="voer een nieuw wachtwoord in" ></input>
        <input type="password" name="confirmPassword" placeholder="Herhaal het nieuwe wachtwoord" ></input>
        <input type="date" name="birthdate" defaultValue={formatDateForInput(props.birthDate)} ></input>
    </div>

  );
};

export default AccountGegevens;
