import React, { useState, useEffect } from 'react';
import BaseLayout from '../layouts/BaseLayout.js';
// import PictureCard from './DeskundigeProfiel/Kolom1DeskundigeComponents/PictureCard.js';
// import BenaderInfo from './DeskundigeProfiel/Kolom1DeskundigeComponents/BenaderInfo.js';
// import AccountGegevens from './DeskundigeProfiel/Kolom2DeskundigeComponents/AccountGegevens.js';
// import BeperkingGegevens from './DeskundigeProfiel/Kolom3DeskundigeComponents/BeperkingGegevens.js';
// import HulpmiddelenGegevens from './DeskundigeProfiel/Kolom3DeskundigeComponents/HulpmiddelenGegevens.js';
// import VoogdGegevens from './DeskundigeProfiel/Kolom2DeskundigeComponents/VoogdGegevens.js';
import { useParams } from 'react-router-dom';


import { useNavigate } from 'react-router-dom';
import './CompanyProfile.css';


const CompanyProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const { userId } = useParams();

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://localhost:7101/api/Company/GetCompany`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'jwt': localStorage.getItem("jwtToken")
          }
        });
        const data = await response.json();
        console.log("jwtToken")
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();

  }, [userId, navigate]);

  return (

    <BaseLayout>
      <div className='profileContainer'>

      </div>
    </BaseLayout>

  );
};

export default CompanyProfile;
//<div className='col1'>
//<PictureCard firstName={userData.firstName} lastName={userData.lastName} phoneNumber={userData.phoneNumber} />
//<BenaderInfo />
//</div>
//<div className='col2'>
//<AccountGegevens email={userData.email} birthDate={userData.birthDate} />
//<VoogdGegevens />
//</div>
//
//<div className='col3'>
//{/* {console.log(userData.disabilities)} */}
//<BeperkingGegevens disabilities={userData.disabilities} />
//<HulpmiddelenGegevens disabilityAids={userData.disabilityAids} />
//</div>