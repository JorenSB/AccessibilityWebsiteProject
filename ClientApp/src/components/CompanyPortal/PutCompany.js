const PutCompany = async (companyData) => {
    try {
        const response = await fetch("https://localhost:7101/api/Company/UpdateCompany", {
            method: 'PUT',
            headers: {
                JWTToken: `${localStorage.getItem('jwtToken')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                companyID: companyData.companyID,
                information: companyData.information,
                companyName: companyData.companyName,
                currentPassword: companyData.currentPassword,
                newPassword: companyData.newPassword,
                email: companyData.email,
                url: companyData.url,
                kvkNumber: companyData.kvkNumber,
                address: companyData.address,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to update company.');
        }
        console.log('Company successfully updated.');
    } catch (e) {
        console.log(e.message)
    }
};

export default PutCompany;
