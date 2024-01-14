import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import placeholderImg from '../../media/placeholder.svg';

const FetchBedrijfEdit = () => {
  const { id } = useParams();
  const [currentBedrijf, setCurrentBedrijf] = useState([]);
  
  const FetchBedrijf = async (id) => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const response = await fetch(`https://localhost:7101/api/portaal/admin/companies/${id}`, {
        method: "GET",
        headers: {
          Authorization: `${jwtToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setCurrentBedrijf([data]);
    } catch (error) {
      console.error('Error:', error);
  }
  
  };

  useEffect(() => {
    FetchBedrijf(id);
  }, [id]);

  return (
    <div className='row fill'>
        {/* max height info page */}
        <div className='col-6 d-flex align-items-stretch'>
            {currentBedrijf.map(bedrijf => (
                <div key={bedrijf.id} className="card border-0 col-lg-12 col-md-12 col-12">
                    <div className='d-flex justify-content-center align-items-center'>
                      <img className="img-rond" height={300} width={500} src={placeholderImg} alt="test"/>
                    </div>
                    <div className="card-body">
                      <div><h3 className="card-title">{bedrijf.companyName}</h3><hr width='35%'></hr></div>
                      <div><h4>Over ons</h4><p>{bedrijf.information ? bedrijf.information : "Momenteel geen Over ons informatie"}</p><hr width='35%'></hr></div>
                        
                      <div className='edit data'>
                        <h6 className="card-subtitle mb-2 text-muted">Huidige aanpasbare informatie:</h6>

                        <form>
                          <div className="mb-3">
                            <label htmlFor="companyName" className="form-label">Naam Bedrijf</label>
                            <div className="input-group">
                              <span className="input-group-text" id="inputGroup-sizing-lg">Naam Bedrijf</span>
                              <input type="text" className="form-control" id="companyName" value={bedrijf.companyName}/>
                            </div>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-mail Bedrijf</label>
                            <div className="input-group">
                              <span className="input-group-text" id="inputGroup-sizing-lg">E-mail Bedrijf</span>
                              <input type="text" className="form-control" id="email" value={bedrijf.email} />
                            </div>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="password" className="form-label">Wachtwoord aanpassen</label>
                            <div className="input-group">
                              <span className="input-group-text" id="inputGroup-sizing-lg">Wachtwoord aanpassen</span>
                              <input type="password" className="form-control" id="password" />
                            </div>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="address" className="form-label">Adresgegevens</label>
                            <div className="input-group">
                              <span className="input-group-text" id="inputGroup-sizing-lg">Adresgegevens</span>
                              <input type="text" className="form-control" id="address" value={bedrijf.address} />
                            </div>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="url" className="form-label">Website adres</label>
                            <div className="input-group">
                              <span className="input-group-text" id="inputGroup-sizing-lg">Website adres</span>
                              <input type="text" className="form-control" id="url" value={bedrijf.url} />
                            </div>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="kvk" className="form-label">KVK nummer</label>
                            <div className="input-group">
                              <span className="input-group-text" id="inputGroup-sizing-lg">KVK nummer</span>
                              <input type="text" className="form-control" id="kvk" value={bedrijf.kvk} />
                            </div>
                          </div>
                          <div className="mb-3 text-center">
                            <button type="submit" className="btn btn-primary">Opslaan</button>
                          </div>
                        </form>
                      </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Laadt nieuw comonent in die alle onderzoeken ophaald van een bedrijf */}
        <div className='col-6'>
            Lijst met Alle onderzoeken - prob een scroll nodig <br></br>
            Mobile design ontbreekt?
        </div>
    </div>
  );
};

export default FetchBedrijfEdit;
