import React, { useState, useEffect } from 'react';
import BaseLayout from '../layouts/DeskundigeLayout.js';
import PictureCard from './DeskundigeProfiel/Kolom1DeskundigeComponents/PictureCard.js';
import BenaderInfo from './DeskundigeProfiel/Kolom1DeskundigeComponents/BenaderInfo.js';
import AccountGegevens from './DeskundigeProfiel/Kolom2DeskundigeComponents/AccountGegevens.js';
import BeperkingGegevens from './DeskundigeProfiel/Kolom3DeskundigeComponents/BeperkingGegevens.js';
import HulpmiddelenGegevens from './DeskundigeProfiel/Kolom3DeskundigeComponents/HulpmiddelenGegevens.js';
import VoogdGegevens from './DeskundigeProfiel/Kolom2DeskundigeComponents/VoogdGegevens.js';

import { useNavigate } from 'react-router-dom';
import './DeskundigeProfiel.css';

const DeskundigeProfiel = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [birthDateData, setBirthdateData] = useState('');

  const [updatedData, setUpdatedData] = useState({});

  const fetchUserData = async () => {
    try {
      const jwt = localStorage.getItem("jwtToken");
      const response = await fetch(`https://localhost:7101/api/deskundige/getuser`, {
        method: 'GET',
        headers: {
          Authorization: `${jwt}`,
        },
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const updateUserData = async () => {
    try {
      const jwt = localStorage.getItem("jwtToken");
      const response = await fetch(`https://localhost:7101/api/deskundige/updateuser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${jwt}`,
        },
        body: JSON.stringify({
          Email: updatedData.email,
          FirstName: updatedData.firstName,
          Password: updatedData.password,
          PhoneNumber: updatedData.phoneNumber,
          BirthDate: updatedData.birthDate, 
          Disabilities: updatedData.disabilities,
          disabilityAids: updatedData.disabilityAids,
          CommercialContact: updatedData.benaderIsChecked,
          PhonePreference: updatedData.phonePreferenceIsChecked,
          EmailPreference: updatedData.emailpreferenceIsChecked

        }),
      });

      if (response.ok) {
        console.log('Gebruikersgegevens succesvol bijgewerkt');

        setTimeout(() => {
          navigate("/deskundige/profiel");
        }, 1000); 
      } else {
        console.error('Fout bijwerken gebruikersgegevens:', response.statusText);
        console.log(response.message);
        console.log(updatedData);
      }
    } catch (error) {
      console.error('Fout bijwerken gebruikersgegevens:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  function handleAccountDataChange(birthdate) {
    setBirthdateData(birthdate);
  };

  const handleDataChange = (data) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <BaseLayout>
      <div className='profileContainer'>
        <div className='col1'>
          <PictureCard onUpdateData={handleDataChange} firstName={userData.firstName} lastName={userData.lastName} phoneNumber={userData.phoneNumber} />
          <BenaderInfo onUpdateData={handleDataChange} emailPreference={userData.emailPreference} phonePreference={userData.phonePreference} commercialContact={userData.commercialContact} />

        </div>
        <div className='col2'>
          <AccountGegevens onUpdateData={handleDataChange} onAccountDataChange={handleAccountDataChange} email={userData.email} birthDate={userData.birthDate} />
          <VoogdGegevens birthDate={userData.birthDate} birthDateData={birthDateData} />
          <button onClick={updateUserData} className='safeButton'>Sla Op</button>
        </div>
        <div className='col3'>
          <BeperkingGegevens onUpdateData={handleDataChange} disabilities={userData.disabilities} />
          <HulpmiddelenGegevens onUpdateData={handleDataChange} disabilityAids={userData.disabilityAids} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default DeskundigeProfiel;
