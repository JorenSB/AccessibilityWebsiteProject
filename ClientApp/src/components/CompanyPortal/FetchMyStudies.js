import { useEffect, useState } from 'react';

const FetchMyStudies = () => {
    const [onderzoekenData, setOnderzoekenData] = useState([]);

    useEffect(() => {
        const FetchMyStudies = async () => {
            try {
                const response = await fetch("https://localhost:7101/api/Study/GetMyStudies", {
                    method: "GET",
                    headers: {
                        JWTToken: `${localStorage.getItem('jwtToken')}`,
                    },
                });
                const data = await response.json();
                setOnderzoekenData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        FetchMyStudies();
    }, []);
    return onderzoekenData;
};
export default FetchMyStudies;
