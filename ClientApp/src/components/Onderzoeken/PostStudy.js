import { useState } from 'react';

const PostStudy = (studyData) => {
    const [createdStudy, setCreatedStudy] = useState(null);

    const addStudy = async () => {
        try {
            const response = await fetch('https://localhost:7101/api/Study/AddStudy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'JWTToken': `${localStorage.getItem('jwtToken')}`,
                },
                body: JSON.stringify(studyData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setCreatedStudy(data);
        } catch (error) {
            console.error('Error adding study:', error);
        }
    };

    return { addStudy, createdStudy };
};

export default PostStudy;
