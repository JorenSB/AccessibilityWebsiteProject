import React, { useState, useEffect } from 'react';
import CompanyLayout from './CompanyLayout';
import { useNavigate, useParams } from 'react-router-dom';
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
        <div className='col1'>
          <p><strong>Information:</strong> {userData.information}</p>
          <p><strong>Company Name:</strong> {userData.companyName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          {/* Add other properties as needed */}
        </div>
        <div className='col2'>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Kvk Number:</strong> {userData.kvkNumber}</p>
          {/* Add other properties as needed */}
        </div>
        <div className='col3'>
          {/* Add other properties as needed */}
        </div>
      </div>
    </CompanyLayout>
  );
};

export default CompanyProfile;