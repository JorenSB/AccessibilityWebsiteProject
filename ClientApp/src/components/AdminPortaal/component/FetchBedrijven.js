import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../../media/placeholder.svg';

import '../AdminPortaal.css';

const FetchBedrijven = () => {
  const [bedrijfData, setBedrijfData] = useState([]);

  const fetchData = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const response = await fetch("https://localhost:7101/api/portaal/admin/companies", {
        method: "GET",
        headers: {
          Authorization: `${jwtToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBedrijfData(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <div className='row listviewer'>
      {bedrijfData.map((data) => (
        <div key={data.id} className="card col-lg-6 col-md-6 col-12 card-figma md-3">
          <div className="card-body w-100">
            <div className='row'>
              <div className='col-lg-3 col-12 d-flex align-items-center justify-content-center'>
                <img alt='placeholder profile img mb-2' height={80} width={80} src={placeholder} className='img-rond'></img>
              </div>
              <div className='col-lg-6 col-12 h-100 '>
                <div className='row h-50 my-3'>
                <h5 className="card-subtitle figma-bg-white-rounded">{data.companyName}</h5>
                </div>
                <div className='row h-50 my-3'>
                <h6 className="card-title figma-bg-white-rounded">{data.kvkNumber}</h6>  
                </div>
                
                  
              </div>
              <div className='col-lg-3 col-12 d-flex align-items-center justify-content-center'>
                <Link to={`/admin/bedrijven/${data.id}`} className="card-link figma-bg-white-rounded px-3 text-decoraction-none text-decoration-none font-weight-bold text-dark">Bekijken {">"}</Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className='row'>
      <div className='col-12 text-center'><button className='btn btn-primary' onClick={fetchData}>Herladen</button></div>
    </div>
  </>
  );
};

export default FetchBedrijven;
