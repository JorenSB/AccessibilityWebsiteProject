import React from 'react';
import './Onderzoek.css';

const Onderzoek = ({ study }) => {
  const {
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
    <div className={`onderzoek ${statusClass}`}>
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
        <h1><a href='#'>Bekijk onderzoek</a></h1>
      </div>
    </div>
  );
};

export default Onderzoek;
