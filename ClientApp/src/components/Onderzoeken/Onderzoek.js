import React from 'react';
import { Link } from 'react-router-dom';
import './Onderzoek.css';

const Onderzoek = ({ study, CompanyID }) => {

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

  const statusClass = status.toLowerCase();

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
        <Link to={`/company/${CompanyID}/onderzoek/${studyID}`}>Bekijk onderzoek</Link>
      </div>
    </div>
  );
};

export default Onderzoek;