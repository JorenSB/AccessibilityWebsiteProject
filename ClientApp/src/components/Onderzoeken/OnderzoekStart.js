import React, { useState } from 'react';
import PostStudy from './PostStudy';
import CompanyLayout from '../CompanyPortal/CompanyLayout';

const OnderzoekStart = () => {
    const [studyData, setStudyData] = useState({
        Title: '',
        Status: '',
        Reward: 0,
        Language: '',
        Beperking: '',
        Date: new Date().toISOString().split('T')[0]
    });

    const { addStudy, createdStudy } = PostStudy(studyData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudyData({
            ...studyData,
            [name]: value,
        });
    };

    const handleAddStudy = () => {
        addStudy();
        // Optionally, you can handle the createdStudy state here
    };

    return (
        <CompanyLayout>
            <div>
                <label>Title:</label>
                <input type="text" name="Title" value={studyData.Title} onChange={handleInputChange} />

                <label>Status:</label>
                <input type="text" name="Status" value={studyData.Status} onChange={handleInputChange} />

                <label>Reward:</label>
                <input type="number" name="Reward" value={studyData.Reward} onChange={handleInputChange} />

                <label>Language:</label>
                <input type="text" name="Language" value={studyData.Language} onChange={handleInputChange} />

                <label>Beperking:</label>
                <input type="text" name="Beperking" value={studyData.Beperking} onChange={handleInputChange} />

                <label>Date:</label>
                <input type="date" name="Date" value={studyData.Date} onChange={handleInputChange} />

                <button onClick={handleAddStudy}>Add Study</button>
            </div>
        </CompanyLayout>
    );
};

export default OnderzoekStart;
