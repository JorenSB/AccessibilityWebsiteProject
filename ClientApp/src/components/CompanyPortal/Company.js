import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CompanyLayout from './CompanyLayout';
import Onderzoek from '../Onderzoeken/Onderzoek.js';
import './Company.css';

const Company = () => {
  const navigate = useNavigate();
  const [activeOnderzoeken, setActiveOnderzoeken] = useState([]);
  const [completedOnderzoeken, setCompletedOnderzoeken] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://localhost:7101/api/Study/GetMyStudies", {
          method: "GET",
          headers: {
            JWTToken: `${localStorage.getItem('jwtToken')}`,
          },
        });
        const data = await response.json();

        const includedStatuses = ['actief', 'active'];

        const activeStudies = data.filter((study) =>
          includedStatuses.includes(study.status.toLowerCase())
        );

        const completedStudies = data.filter((study) =>
          !includedStatuses.includes(study.status.toLowerCase())
        );

        // // Split onderzoeken based on status
        // const activeStudies = data.filter((study) => study.status.toLowerCase() in ['active', 'actief']);
        // const completedStudies = data.filter((study) => !study.status.toLowerCase() in ['active', 'actief']);

        setActiveOnderzoeken(activeStudies);
        setCompletedOnderzoeken(completedStudies);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  return (
    <CompanyLayout>
      <div className='titleContainer'>
        <h1 className='titleOnderzoek'>Mijn Onderzoeken</h1>
      </div>
      <div className='onderzoekContainer'>
        {activeOnderzoeken.map((study, index) => (
          <Onderzoek key={index} study={study} />
        ))}
      </div>
      <div className='titleContainer'>
        <h1 className='titleOnderzoek'>Afgeronde Onderzoeken</h1>
      </div>
      <div className='onderzoekContainer'>
        {completedOnderzoeken.map((study, index) => (
          <Onderzoek key={index} study={study} />
        ))}
      </div>
    </CompanyLayout>
  );
};

export default Company;
