import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import placeholderImg from '../../media/placeholder.svg';

const FetchBedrijfEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentBedrijf, setCurrentBedrijf] = useState({
    companyName: '',
    email: '',
    newPassword: '',
    address: '',
    url: '',
    kvkNumber: 0,
    information: '',
    });
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
    
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
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const HandleDelete = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const response = await fetch(`https://localhost:7101/api/portaal/admin/companies/${id}`, {
        method: "DELETE",
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const redirectToOverview = () => {
    navigate('/admin/bedrijven');
  };

  useEffect(() => {
    FetchBedrijf();
  }, [id]);

  useEffect(() => {
    console.log("Updated Bedrijf State:", currentBedrijf);
  }, [currentBedrijf]);

  return (
    <>
    <div className='row fill'>
      <div className='col-6 d-flex align-items-stretch'>
        {currentBedrijf && (
          <div key={currentBedrijf.id} className="card border-0 col-lg-12 col-md-12 col-12">
            <div className='d-flex'>
              <img className='img' src={placeholderImg} alt='Bedrijfslogo' width={500} height={200}></img>
            </div>
            <div className="card-body">
              <div>
                <h3 className="card-title">{currentBedrijf.companyName || 'Bedrijfsnaam'}</h3>
                <hr width='35%'></hr>
              </div>
              <div>
                <h4>Over ons</h4>
                <p style={{fontWeight: 'normal'}}>{currentBedrijf.information ? currentBedrijf.information : "Geen informatie"}</p>
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
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3 text-center">
                    <div className='row'>
                      <div className='col-3'>
                      <button type="submit" className="btn btn-primary">
                        Opslaan
                      </button>
                      </div>
                      <div className='col-6'>
                        <div className="mb-3 text-center">
                          <Link className='btn btn-secondary' to={'/admin/bedrijven'}>Terug naar overzicht</Link>
                        </div>
                      </div>
                      <div className='col-3'>
                        <div className='mb-3 text-center'>
                          <button className='btn btn-danger ' onClick={toggle}>Verwijderen</button>
                        </div>
                      </div>
                    </div>
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

    <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Weet u het zeker!</ModalHeader>
        <ModalBody>
          Verwijderen is permanent!
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => {
          HandleDelete();
          toggle();
          redirectToOverview();
          }}>
            Verwijderen
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Sluiten
          </Button>
        </ModalFooter>
      </Modal>

    </>
  );
};

export default FetchBedrijfEdit;
