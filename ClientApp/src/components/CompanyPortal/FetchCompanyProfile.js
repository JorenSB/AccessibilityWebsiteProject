import { useState, useEffect } from 'react';

const  FetchCompanyProfile = () => {
    const [CompanyData, setCompanyData] = useState([]);

    useEffect(() => {
        const FetchCompanyProfile = async () => {
            try {
                const response = await fetch("https://localhost:7101/api/Company/GetCompany", {
                    method: "GET",
                    headers: {
                        JWTToken: `${localStorage.getItem('jwtToken')}`,
                    },
                });
                const data = await response.json();
                setCompanyData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        FetchCompanyProfile();
    }, []);
    return CompanyData;
}
export default FetchCompanyProfile;