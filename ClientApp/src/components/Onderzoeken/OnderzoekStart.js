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
        const { name, value } = e.target;
        setStudyData({
            ...studyData,
            [name]: value,
        });
    };

    const [buttonColor, setButtonColor] = useState('green');

    const handleSaveClick = () => {
        setButtonColor('orange');

        addStudy();

        setTimeout(() => {
            setButtonColor('green');
        }, 400);
    };

    return (
        <CompanyLayout>
            <div className="container">
                <div className="col1">
                    <label><strong>Titel:</strong></label>
                    <input
                        type="text"
                        name="Titel"
                        value={studyData.Title}
                        onChange={handleInputChange}
                    />

                    <label><strong>Status:</strong></label>
                    <input
                        type="text"
                        name="Status"
                        value={studyData.Status}
                        onChange={handleInputChange}
                    />

                    <label><strong>Beloning:</strong></label>
                    <input
                        type="number"
                        name="Beloning"
                        value={studyData.Reward}
                        onChange={handleInputChange}
                    />

                    <label><strong>Taal:</strong></label>
                    <input
                        type="text"
                        name="Taal"
                        value={studyData.Language}
                        onChange={handleInputChange}
                    />

                    <label><strong>Beperking:</strong></label>
                    <input
                        type="text"
                        name="Beperking"
                        value={studyData.Beperking}
                        onChange={handleInputChange}
                    />

                    <label><strong>Datum:</strong></label>
                    <input
                        type="date"
                        name="Datum"
                        value={studyData.Date}
                        onChange={handleInputChange}
                    />
                </div>
                <button className={`saveButton ${buttonColor}`} onClick={handleSaveClick}>
                    Toevoegen
                </button>
            </div>
        </CompanyLayout>
    );
};

export default OnderzoekStart;
