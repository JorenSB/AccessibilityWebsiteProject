import React, { useState, useEffect } from 'react';
import './AccountGegevens.css';

function AccountGegevens(props) {

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [birthDate, setbirthDate] = useState('');


  const formatDateForInput = (dateString) => {
    if (!dateString) {
      return '';
    }
    const datePart = dateString.split('T')[0];

    return datePart;
  };

  const handleBirthdateChange = (event) => {
    setbirthDate(event.target.value);

    if (props.onAccountDataChange) {
      props.onAccountDataChange(event.target.value);
    }
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      console.error('Wachtwoord en bevestigingswachtwoord komen niet overeen!');
      return;
    }

    handleDataUpdate({ email: email === '' ? null : email, password: password === '' ? null : password , birthDate: birthDate === '' ? null : birthDate });
  }, [email, password, birthDate]);

  const handleDataUpdate = (updatedData) => {
    if (props.onUpdateData) {
      props.onUpdateData(updatedData);
    }
  };

  return (
    <div className='accountGegevensContainer'>
      <h2>Uw account gegevens</h2>
      <input
        type="email"
        name="email"
        placeholder={props.email}
        onChange={e => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        name="password"
        placeholder="voer een nieuw wachtwoord in"
        onChange={e => setpassword(e.target.value)}
      ></input>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Herhaal het nieuwe wachtwoord"
        onChange={e => setconfirmPassword(e.target.value)}
      ></input>
      <input
        type="date"
        name="birthdate"
        defaultValue={formatDateForInput(props.birthDate)}
        onChange={e => handleBirthdateChange(e)}
        
      ></input>
    </div>
  );
}

export default AccountGegevens;
