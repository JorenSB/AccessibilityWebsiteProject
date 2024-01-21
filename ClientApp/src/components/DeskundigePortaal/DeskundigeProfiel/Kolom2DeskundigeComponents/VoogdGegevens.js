import React, { useEffect, useState } from 'react';
import './VoogdGegevens.css';

function VoogdGegevens(props) {
  const [volwassen, setVolwassen] = useState(false);
  const [guardianFirstName, setGuardianFirstName] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [guardianPhoneNumber, setGuardianPhoneNumber] = useState('');
  const [guardianBirthDate, setGuardianBirthDate] = useState('');

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

  const formatDateForInput = (dateString) => {
    if (!dateString) {
      return '';
    }
    const datePart = dateString.split('T')[0];

    return datePart;
  };

  useEffect(() => {
    const age = calculateAge(props.birthDate);
    setVolwassen(age >= 18);
  }, [props.birthDate]);

  useEffect(() => {
    const age = calculateAge(props.birthDateData);
    setVolwassen(age >= 18);
  }, [props.birthDateData]);

  useEffect(() => {
    setGuardianBirthDate(formatDateForInput(props.GuardianBirthDate));
  }, [props.GuardianBirthDate]);

  useEffect(() => {
    handleDataUpdate({
      guardianFirstName: guardianFirstName === '' ? null : guardianFirstName,
      guardianEmail: guardianEmail === '' ? null : guardianEmail,
      guardianPhoneNumber: guardianPhoneNumber === '' ? null : guardianPhoneNumber,
      guardianBirthDate: guardianBirthDate === '' ? null : guardianBirthDate,
    });
    console.log(guardianFirstName, guardianEmail, guardianPhoneNumber, guardianBirthDate);
  }, [guardianFirstName, guardianEmail, guardianPhoneNumber, guardianBirthDate]);

  const handleDataUpdate = (updatedData) => {
    if (props.onUpdateData) {
      props.onUpdateData(updatedData);
    }
  };

  return (
    <div className='voogdGegevensContainer'>
      {!volwassen && (
        <>
          <h2>Voogd gegevens</h2>
          <input onChange={(e) => setGuardianFirstName(e.target.value)} type="text" name="naam" placeholder={props.guardianFirstName || "voer een naam in"} required />
          <input onChange={(e) => setGuardianBirthDate(e.target.value)} type="date" name="birthdate" value={guardianBirthDate} required />
          <input onChange={(e) => setGuardianEmail(e.target.value)} type="email" name="email" placeholder={props.GuardianEmail || "voer een email in"} required />
          <input onChange={(e) => setGuardianPhoneNumber(e.target.value)} type="tel" name="phonenumber" placeholder={props.GuardianPhoneNumber || "voer een telefoonnummer in"} required />
        </>
      )}
    </div>
  );
}

export default VoogdGegevens;
