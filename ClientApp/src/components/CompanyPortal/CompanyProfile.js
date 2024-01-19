import CompanyLayout from './CompanyLayout';
import './CompanyProfile.css';
import FetchCompanyProfile from './FetchCompanyProfile';

const CompanyProfile = () => {
  const CompanyData = FetchCompanyProfile();
  
  return (
    <CompanyLayout>
      <div className='profileContainer'>
        <div className='col1'>
          <p><strong>Information:</strong> {CompanyData.information}</p>
          <p><strong>Company Name:</strong> {CompanyData.companyName}</p>
          <p><strong>Email:</strong> {CompanyData.email}</p>
          {/* Add other properties as needed */}
        </div>
        <div className='col2'>
          <p><strong>Address:</strong> {CompanyData.address}</p>
          <p><strong>Kvk Number:</strong> {CompanyData.kvkNumber}</p>
          {/* Add other properties as needed */}
        </div>
        <div className='col3'>
          {/* Add other properties as needed */}
        </div>
      </div>
    </CompanyLayout>
  );
};

export default CompanyProfile;