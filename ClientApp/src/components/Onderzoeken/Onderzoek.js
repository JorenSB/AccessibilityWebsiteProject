import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Onderzoek.css';

const Onderzoek = ({ study, CompanyID }) => {
  const navigate = useNavigate();
  const [buttonStatus, setButtonStatus] = useState('default');

  const {
    studyID,
    title,
    status,
    reward,
    language,
    beperking,
    date,
    result,
  } = study;

  const handleButtonClick = async () => {
    setButtonStatus('pressed');

    await new Promise(resolve => setTimeout(resolve, 150));
    var path = "/company/" + CompanyID + "/onderzoek/" + studyID;
    navigate(path)

    setTimeout(() => {
      setButtonStatus('default');
    }, 400);
  };

  return (
    <div className={`onderzoek ${status}`}>
      <div className='upperhalf'>
        <div className='infoItem'>
          <h1>{title}</h1>
          <h1>Status: {status}</h1>
          <h1>Datum: {new Date(date).toLocaleDateString()}</h1>
          <h1>Beloning: €{reward}</h1>
        </div>
        {result && (
          <div className='reviewItem'>
            <h1>Review:</h1>
            <p>Score: {result.Score}</p>
            <p>Feedback: {result.Feedback}</p>
          </div>
        )}
      </div>
      <div className='lowerhalf'>
        <p>Taal: {language}</p>
        <p>Beperking: {beperking}</p>
        <div className="backButtonContainer">
          <button className={`actionButton ${buttonStatus}`} onClick={handleButtonClick}>Bekijk onderzoek</button>
        </div>
      </div>
    </div>
  );
};

export default Onderzoek;