import CompanyLayout from './CompanyLayout';
import Onderzoek from '../Onderzoeken/Onderzoek.js';
import './Company.css';
import FetchMyStudies from './FetchMyStudies.js';
import FetchCompanyProfile from './FetchCompanyProfile';

const Company = () => {
  const CompanyData = FetchCompanyProfile();

  const onderzoekenData = FetchMyStudies();

  const activeOnderzoeken = onderzoekenData.filter(study =>
    ['actief', 'active'].includes(study.status.toLowerCase())
  );
  const completedOnderzoeken = onderzoekenData.filter(study =>
    !['actief', 'active'].includes(study.status.toLowerCase())
  );

  return (
    <CompanyLayout>
      <div className='titleContainer'>
        <h1 className='titleOnderzoek'>{CompanyData.companyName}'s Actieve Onderzoeken</h1>
      </div>
      <div className='onderzoekContainer'>
        {activeOnderzoeken.map((study, index) => (
          <Onderzoek key={index} study={study} CompanyID={CompanyData.companyID} />
        ))}
      </div>
      <div className='titleContainer'>
        <h1 className='titleOnderzoek'>{CompanyData.companyName}'s Afgeronde Onderzoeken</h1>
      </div>
      <div className='onderzoekContainer'>
        {completedOnderzoeken.map((study, index) => (
          <Onderzoek key={index} study={study} CompanyID={CompanyData.companyID} />
        ))}
      </div>
    </CompanyLayout>
  );
};

export default Company;
