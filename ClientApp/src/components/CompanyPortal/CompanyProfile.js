import { useState, useEffect } from 'react';
import CompanyLayout from './CompanyLayout';
import './CompanyProfile.css';
import FetchCompanyProfile from './FetchCompanyProfile';
import PutCompany from './PutCompany';

const CompanyProfile = () => {
  var data = FetchCompanyProfile();

  var [companyData, setCompanyData] = useState();

  useEffect(() => {
    setCompanyData(data);
  }, [data])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [buttonColor, setButtonColor] = useState('green');

  const handleSaveClick = () => {
    setButtonColor('orange');

    PutCompany(companyData);

    setTimeout(() => {
      setButtonColor('green');
    }, 400);
  };

  return (
    <CompanyLayout>
      <div className="container">
        <div className="col1">
          <label><strong>Informatie:</strong></label>
          <input
            type="text"
            name="information"
            value={companyData?.information || ''}
            onChange={handleInputChange}
          />

          <label><strong>Bedrijfsnaam:</strong></label>
          <input
            type="text"
            name="companyName"
            value={companyData?.companyName || ''}
            onChange={handleInputChange}
          />

          <label><strong>Email:</strong></label>
          <input
            type="text"
            name="email"
            value={companyData?.email || ''}
            onChange={handleInputChange}
          />

          <label><strong>Adres:</strong></label>
          <input
            type="text"
            name="address"
            value={companyData?.address || ''}
            onChange={handleInputChange}
          />

          <label><strong>Kvk Nummer:</strong></label>
          <input
            type="text"
            name="kvkNumber"
            value={companyData?.kvkNumber || ''}
            onChange={handleInputChange}
          />

          <label><strong>URL:</strong></label>
          <input
            type="text"
            name="url"
            value={companyData?.url || ''}
            onChange={handleInputChange}
          />

          <label><strong>Huidig Wachtwoord:</strong></label>
          <input
            type="password"
            name="currentPassword"
            value={companyData?.currentPassword || ''}
            onChange={handleInputChange}
          />

          <label><strong>Nieuw Wachtwoord:</strong></label>
          <input
            type="password"
            name="newPassword"
            value={companyData?.newPassword || ''}
            onChange={handleInputChange}
          />
        </div>
        <button className={`saveButton ${buttonColor}`} onClick={handleSaveClick}>
          Opslaan
        </button>
      </div>
    </CompanyLayout>
  );
}
export default CompanyProfile;
