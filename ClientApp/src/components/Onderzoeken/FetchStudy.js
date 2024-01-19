import { useEffect, useState } from 'react';

const FetchStudy = (StudyID) => {
    const [study, setStudy] = useState([]);

    useEffect(() => {
        const FetchStudy = async () => {
            try {
                const response = await fetch(`https://localhost:7101/api/Study/GetStudy?id=${StudyID}`, {
                    method: "GET",
                    headers: {
                        JWTToken: `${localStorage.getItem('jwtToken')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setStudy(data);
            } catch (error) {
                console.error('Error fetching study data:', error);
            }
        };
        FetchStudy();
    }, [StudyID]);
    return study;
};
export default FetchStudy;
