import React, { useState, useEffect } from 'react';
import CompanyLayout from './CompanyLayout';
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
        const response = await fetch("https://localhost:7101/api/Company/GetCompany", {
          method: "GET",
          headers: {
            JWTToken: `${localStorage.getItem('jwtToken')}`,
          },
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();

  }, [userId, navigate]);

  return (

    <CompanyLayout>
      <div className='profileContainer'>
        <p>test {userData.companyName}</p>
      </div>
    </CompanyLayout>

  );
};

export default CompanyProfile;