import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import placeholderImg from '../../media/placeholder.svg';

const FetchExpertEdit = (props) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [currentExpert, setCurrentExpert] = useState({
        firstName: '',
        lastName: '',
        email: '',
        newPassword: '',
        commercialContact: false,
        emailPreference: false,
        phonePreference: false,
        birthDate: new Date(),
    });
        
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
        
    const handleChange = (e) => {
        const { id, type, checked, value } = e.target;

        if (type === 'checkbox') {
            setCurrentExpert((prevExpert) => ({ ...prevExpert, [id]: checked }));
        } else {
            setCurrentExpert((prevExpert) => ({ ...prevExpert, [id]: value }));
        }
    };
    
    const FetchExpert = async () => {
        try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await fetch(`https://localhost:7101/api/portaal/admin/experts/${id}`, {
            method: "GET",
            headers: {
            Authorization: `${jwtToken}`,
            },
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            const data = await response.json();
            setCurrentExpert(data);
            console.log(currentExpert);
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };
    
    const handleSubmit = async (e) => {
        try {
        e.preventDefault();
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await fetch(`https://localhost:7101/api/portaal/admin/experts/${id}`, {
            method: "PUT",
            headers: {
            Authorization: `${jwtToken}`,
            'Content-Type': 'application/json', // Make sure to set the content type
            },
            body: JSON.stringify(currentExpert),
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
        const response = await fetch(`https://localhost:7101/api/portaal/admin/experts/${id}`, {
            method: "DELETE",
            headers: {
            Authorization: `${jwtToken}`,
            'Content-Type': 'application/json', // Make sure to set the content type
            },
            body: JSON.stringify(currentExpert),
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
        navigate('/admin/deskundigen');
    };
    
    useEffect(() => {
        FetchExpert();
    }, []);
    
    useEffect(() => {
        console.log("Updated Expert State:", currentExpert);
    }, [currentExpert]);


    return (
        <>
    <div className='row fill'>
      <div className='col-6 d-flex align-items-stretch'>
        {currentExpert && (
          <div key={currentExpert.id} className="card border-0 col-lg-12 col-md-12 col-12">
            <div className='d-flex'>
              <img className='img' src={placeholderImg} alt={'Profielfoto ' + currentExpert.firstName} width={500} height={200}></img>
            </div>
            <div className="card-body">
              <div>
                <h3 className="card-title">{currentExpert.firstName || 'Bedrijfsnaam'} {currentExpert.lastName || ''}</h3>
                <hr width='35%'></hr>
              </div>
              <div className='edit data'>
                <h6 className="card-subtitle mb-2 text-muted">Huidige aanpasbare informatie:</h6>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <div className="input-group">
                        <span className="input-group-text" id="inputGroup-sizing-lg">
                        Voornaam
                        </span>
                        <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={currentExpert.firstName}
                        onChange={handleChange}
                        />
                    </div>
                    </div>
                    <div className="mb-3">
                    <div className="input-group">
                        <span className="input-group-text" id="inputGroup-sizing-lg">
                        Achternaam
                        </span>
                        <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={currentExpert.lastName}
                        onChange={handleChange}
                        />
                    </div>
                    </div>

                    <div className="mb-3">
                    <div className="input-group">
                        <span className="input-group-text" id="inputGroup-sizing-lg">
                        E-mail
                        </span>
                        <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={currentExpert.email}
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
                        value={currentExpert.newPassword}
                        onChange={handleChange}
                        />
                    </div>
                    </div>

                    <div className="mb-3">
                    <div className="input-group">
                        <span className="input-group-text" id="inputGroup-sizing-lg">
                        Geboortedatum
                        </span>
                        <input
                        type="date"
                        className="form-control"
                        id="birthDate"
                        value={currentExpert.birthDate}
                        onChange={handleChange}
                        />
                    </div>
                    </div>

                    <div class="input-group mb-3">
                        <div className="input-group-text">
                            <input 
                                className="form-check-input mt-0"  
                                id="commercialContact" 
                                type="checkbox" 
                                checked={currentExpert.commercialContact} 
                                aria-label="Checkbox voor het accepteren van commercieel contact" 
                                onChange={handleChange}
                            />
                        </div>
                        <label className="input-group-text" for="commercialContact">Kan benaderd worden door commerciele partijen</label>
                    </div>
                    {currentExpert.commercialContact && (
                        <>
                        <h6 className="card-subtitle mb-2 text-muted">Benaderings opties:</h6>
                        {/* Telefonisch */}
                        <div class="input-group mb-3">
                            <div className="input-group-text">
                                <input 
                                    className="form-check-input mt-0" 
                                    id="phonePreference" 
                                    type="checkbox" 
                                    checked={currentExpert.phonePreference} 
                                    aria-label="Checkbox voor commercieel contact via telefoon" 
                                    onChange={handleChange}
                                />
                            </div>
                            <label className="input-group-text" for="phonePreference">Telefonisch contact</label>
                        </div>
                        {/* Email */}
                        <div class="input-group mb-3">
                            <div className="input-group-text">
                                <input className="form-check-input mt-0" id="emailPreference" type="checkbox" checked={currentExpert.emailPreference} aria-label="Checkbox voor commercieel contact via email" onChange={handleChange}/>
                            </div>
                            <label className="input-group-text" for="emailPreference">E-mail contact</label>
                        </div>
                        </>
                    )}
                  <div className="mb-3 text-center">
                    <div className='row'>
                      <div class="d-grid gap-2 col-12 mx-auto">
                        <button type="submit" className="btn btn-primary">
                        Opslaan
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className='row'>
                    <div className='col-8'>
                        <div className="mb-3 text-center">
                          <Link className='btn btn-secondary' to={'/admin/deskundigen'}>Terug naar overzicht</Link>
                        </div>
                      </div>
                    <div className='col-4'>
                    <div className='mb-3 text-center'>
                        <button className='btn btn-danger ' onClick={toggle}>Verwijderen</button>
                    </div>
                    </div>
                </div>
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
          }}>
            <Link to={'/admin/deskundigen'}>Verwijderen</Link>
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Sluiten
          </Button>
        </ModalFooter>
      </Modal>

    </>
    );
};
    
export default FetchExpertEdit;