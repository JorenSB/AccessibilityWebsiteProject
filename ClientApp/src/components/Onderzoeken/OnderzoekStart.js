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
                    <label><strong>Title:</strong></label>
                    <input
                        type="text"
                        name="Title"
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

                    <label><strong>Reward:</strong></label>
                    <input
                        type="number"
                        name="Reward"
                        value={studyData.Reward}
                        onChange={handleInputChange}
                    />

                    <label><strong>Language:</strong></label>
                    <input
                        type="text"
                        name="Language"
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

                    <label><strong>Date:</strong></label>
                    <input
                        type="date"
                        name="Date"
                        value={studyData.Date}
                        onChange={handleInputChange}
                    />
                </div>
                <button className={`saveButton ${buttonColor}`} onClick={handleSaveClick}>
                    Add Study
                </button>
            </div>
        </CompanyLayout>
    );
};

export default OnderzoekStart;
