import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../../media/placeholder.svg';

import '../AdminPortaal.css';

const FetchExperts = () => {

  const [expertData, setExpertData] = useState([]);

  const fetcher = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    fetch("https://localhost:7101/api/portaal/admin/experts", {
        method: "GET",
        headers: {
          Authorization: `${jwtToken}`,
        },
      })
        .then((response) => { return response.json(); })
        .then((data) => {
            setExpertData(data);
        })
        .catch((error) => console.log('Error:', error, error.response));
  }

  useEffect(() => {
    fetcher();
    }, []);

  return (
   
    <div className='row listviewer'>
    {expertData.map(expert => (
      <div key={expert.id} className="card col-lg-6 col-md-6 col-12 card-figma my-1">
        <div className="card-body">
          <div className='row'>
            <div className='col-lg-3 col-12 d-flex align-items-center justify-content-center'>
                <img alt='placeholder profile img mb-2' height={80} width={80} src={placeholder} className='img-rond'></img>
            </div>
            <div className='col-lg-6 col-12 d-flex align-items-center h-100'>
              <table className='table table-borderless table-responsive text-center w-100'>
                <tbody>
                  <tr>
                    <td className='align-top'>
                      <h5 className="card-title figma-bg-white-rounded">{expert.firstName} {expert.lastName}</h5>
                    </td>
                  </tr>
                  
                  <tr>
                    <td className='align-bottom'>
                      <h6 className="card-subtitle figma-bg-white-rounded">{expert.email}</h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-lg-3 col-12 d-flex align-items-center justify-content-center'>
                <Link to={'/admin/deskundigen/' + expert.id} className="card-link figma-bg-white-rounded px-3 text-decoraction-none text-decoration-none font-weight-bold">Bekijk ></Link>
            </div>
          </div>
        </div>
      </div>
    ))}
    </div>
  );
}
export default FetchExperts;