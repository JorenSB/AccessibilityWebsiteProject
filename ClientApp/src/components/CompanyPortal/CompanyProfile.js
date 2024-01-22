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
    const { id, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const [buttonStatus, setButtonStatus] = useState('default');

  const handleSaveClick = () => {
    setButtonStatus('pressed');

    PutCompany(companyData);

    setTimeout(() => {
      setButtonStatus('default');
    }, 400);
  };

  return (
    <CompanyLayout>
      <div className="container">
        <div className="col1">
          <label htmlFor='information'>Informatie:</label>
          <input
            type="text"
            id="information"
            value={companyData?.information || ''}
            onChange={handleInputChange}
          />

          <label htmlFor='companyName'>Bedrijfsnaam:</label>
          <input
            type="text"
            id="companyName"
            value={companyData?.companyName || ''}
            onChange={handleInputChange}
          />

          <label htmlFor='email'>Email:</label>
          <input
            type="text"
            id="email"
            value={companyData?.email || ''}
            onChange={handleInputChange}
          />

          <label htmlFor='address'>Adres:</label>
          <input
            type="text"
            id="address"
            value={companyData?.address || ''}
            onChange={handleInputChange}
          />

          <label htmlFor='kvkNumber'>Kvk Nummer:</label>
          <input
            type="text"
            name="kvkNumber"
            value={companyData?.kvkNumber || ''}
            onChange={handleInputChange}
          />

          <label htmlFor='url'>URL:</label>
          <input
            type="text"
            id="url"
            value={companyData?.url || ''}
            onChange={handleInputChange}
          />

          <label htmlFor='currentPassword'>Huidig Wachtwoord:</label>
          <input
            type="password"
            id="currentPassword"
            value={companyData?.currentPassword || ''}
            onChange={handleInputChange}
          />

          <label htmlFor='newPassword'>Nieuw Wachtwoord:</label>
          <input
            type="password"
            id="newPassword"
            value={companyData?.newPassword || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="backButtonContainer">
          <button className={`actionButton ${buttonStatus}`} onClick={handleSaveClick}>Opslaan</button>
        </div>
      </div>
    </CompanyLayout>
  );
}
export default CompanyProfile;
