import React, { useState } from 'react';
import PostStudy from './PostStudy';
import CompanyLayout from '../CompanyPortal/CompanyLayout';
import './OnderzoekStart.css';

const OnderzoekStart = () => {
    const [studyData, setStudyData] = useState({
        Title: '',
        Status: '',
        Reward: 0,
        Language: '',
        Beperking: '',
        Date: new Date().toISOString().split('T')[0],
    });

    const { addStudy, createdStudy } = PostStudy(studyData);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setStudyData({
            ...studyData,
            [id]: value,
        });
    };

    const [buttonStatus, setButtonStatus] = useState('default');

    const handleSaveClick = () => {
        setButtonStatus('pressed');

        addStudy();

        setTimeout(() => {
            setButtonStatus('default');
        }, 400);
    };

    return (
        <CompanyLayout>
            <div className="container">
                <div className="col1">
                    <label htmlFor='Title'>Titel:</label>
                    <input
                        type="text"
                        id="Title"
                        value={studyData.Title}
                        onChange={handleInputChange}
                    />

                    <label htmlFor='Status'>Status:</label>
                    <input
                        type="text"
                        id="Status"
                        value={studyData.Status}
                        onChange={handleInputChange}
                    />

                    <label htmlFor='Reward'>Beloning</label>
                    <input
                        type="number"
                        id="Reward"
                        value={studyData.Reward}
                        onChange={handleInputChange}
                    />

                    <label htmlFor='Language'>Taal:</label>
                    <input
                        type="text"
                        id="Language"
                        value={studyData.Language}
                        onChange={handleInputChange}
                    />

                    <label htmlFor='Beperking'>Beperking:</label>
                    <input
                        type="text"
                        id="Beperking"
                        value={studyData.Beperking}
                        onChange={handleInputChange}
                    />

                    <label htmlFor='Date'>Datum:</label>
                    <input
                        type="date"
                        id="Date"
                        value={studyData.Date}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="backButtonContainer">
                    <button className={`actionButton ${buttonStatus}`} onClick={handleSaveClick}>
                        Toevoegen
                    </button>
                </div>
            </div>
        </CompanyLayout>
    );
};

export default OnderzoekStart;
