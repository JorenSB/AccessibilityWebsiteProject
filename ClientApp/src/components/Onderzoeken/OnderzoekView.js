import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import CompanyLayout from '../CompanyPortal/CompanyLayout';
import './OnderzoekView.css';
import FetchStudy from './FetchStudy';

const OnderzoekView = ({ }) => {
    const location = useLocation();
    const { pathname } = location;
    const [, , CompanyID, , StudyID] = pathname.split('/');
    const study = FetchStudy(StudyID);

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
                <Link to="/company">Terug naar onderzoeken overzicht</Link>
            </div>
        </CompanyLayout>
    );
};

export default OnderzoekView;
