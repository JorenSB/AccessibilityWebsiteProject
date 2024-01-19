import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import placeholderImg from '../../media/placeholder.svg';

const FetchBedrijfEdit = () => {
  const { id } = useParams();
  const [currentBedrijf, setCurrentBedrijf] = useState({
    companyName: '',
    email: '',
    newPassword: '',
    address: '',
    url: '',
    kvkNumber: 0,
    information: '',
    });
    
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCurrentBedrijf((prevBedrijf) => ({ ...prevBedrijf, [id]: value }));
  };

  const FetchBedrijf = async () => {
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
      } else {
        const data = await response.json();
        setCurrentBedrijf(data);
        console.log(currentBedrijf);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const response = await fetch(`https://localhost:7101/api/portaal/admin/companies/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `${jwtToken}`,
          'Content-Type': 'application/json', // Make sure to set the content type
        },
        body: JSON.stringify(currentBedrijf),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        console.log("succes?!")
      }
    
      // Handle success, if needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    FetchBedrijf();
  }, [id]);

  useEffect(() => {
    console.log("Updated Bedrijf State:", currentBedrijf);
  }, [currentBedrijf]);

  return (
    <div className='row fill'>
      <div className='col-6 d-flex align-items-stretch'>
        {currentBedrijf && (
          <div key={currentBedrijf.id} className="card border-0 col-lg-12 col-md-12 col-12">
            <div className='d-flex'>
              <img className='img' src={placeholderImg} alt='Bedrijfslogo' width={500} height={200}></img>
            </div>
            <div className="card-body">
              <div>
                <h3 className="card-title">{currentBedrijf.companyName || 'Could not load the data'}</h3>
                <hr width='35%'></hr>
              </div>
              <div>
                <h4>Over ons</h4>
                <p>{currentBedrijf.information ? currentBedrijf.information : "Momenteel geen Over ons informatie"}</p>
                <hr width='35%'></hr>
              </div>

              <div className='edit data'>
                <h6 className="card-subtitle mb-2 text-muted">Huidige aanpasbare informatie:</h6>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" id="inputGroup-sizing-lg">
                        Naam Bedrijf
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="companyName"
                        value={currentBedrijf.companyName}
                        defaultValue='No Name found'
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" id="inputGroup-sizing-lg">
                        E-mail Bedrijf
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={currentBedrijf.email}
                        defaultValue='no email found'
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" id="inputGroup-sizing-lg">
                        Wachtwoord aanpassen
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={currentBedrijf.newPassword}
                        defaultValue=''
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" id="inputGroup-sizing-lg">
                        Bedrijfsinformatie
                      </span>
                      <textarea
                        rows={2}
                        type="textarea"
                        className="form-control"
                        id="information"
                        value={currentBedrijf.information}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" id="inputGroup-sizing-lg">
                        Adresgegevens
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={currentBedrijf.address}
                        defaultValue='No adress found'
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" id="inputGroup-sizing-lg">
                        Website adres
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="url"
                        value={currentBedrijf.url}
                        defaultValue='No website-url found'
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" id="inputGroup-sizing-lg">
                        KVK nummer
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        id="kvkNumber"
                        value={currentBedrijf.kvkNumber}
                        defaultValue={0}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary">
                      Opslaan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
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
