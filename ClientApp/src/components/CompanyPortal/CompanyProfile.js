import { useState, useEffect } from 'react';
import CompanyLayout from './CompanyLayout';
import './CompanyProfile.css';
import FetchCompanyProfile from './FetchCompanyProfile';

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



    setTimeout(() => {
      setButtonColor('green');
    }, 400);
  };
  return (
    <CompanyLayout>
      <div className="container">
        <div className="col1">
          <label><strong>Information:</strong></label>
          <input
            type="text"
            name="information"
            value={companyData?.information || ''}
            onChange={handleInputChange}
          />
          <label><strong>Company Name:</strong></label>
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
          <label><strong>Address:</strong></label>
          <input
            type="text"
            name="address"
            value={companyData?.address || ''}
            onChange={handleInputChange}
          />
          <label><strong>Kvk Number:</strong></label>
          <input
            type="text"
            name="kvkNumber"
            value={companyData?.kvkNumber || ''}
            onChange={handleInputChange}
          />
        </div>
        <button className={`saveButton ${buttonColor}`} onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </CompanyLayout>
  );
};

export default CompanyProfile;
