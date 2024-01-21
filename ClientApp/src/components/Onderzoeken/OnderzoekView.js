import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CompanyLayout from '../CompanyPortal/CompanyLayout';
import './OnderzoekView.css';
import FetchStudy from './FetchStudy';

const OnderzoekView = ({ }) => {
    const location = useLocation();
    const { pathname } = location;
    const [, , CompanyID, , StudyID] = pathname.split('/');
    const study = FetchStudy(StudyID);
    const [buttonStatus, setButtonStatus] = useState('default');
    const navigate = useNavigate();

    const handleButtonClick = async () => {
        setButtonStatus('pressed');

        await new Promise(resolve => setTimeout(resolve, 150));

        navigate('/company')

        setTimeout(() => {
            setButtonStatus('default');
        }, 400);
    };

    if (study == null) {
        return (<p>No study found</p>)
    }

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



    return (
        <CompanyLayout>
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
                </div>
            </div>
            <div className="backButtonContainer">
                <button className={`actionButton ${buttonStatus}`} onClick={handleButtonClick}>Terug naar overzicht</button>
            </div>
        </CompanyLayout>
    );
};

export default OnderzoekView;
