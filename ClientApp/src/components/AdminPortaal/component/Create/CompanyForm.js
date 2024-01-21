import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CompanyForm = () => {
    const [company, setCompany] = useState({
        companyName: '',
        email: '',
        password: '',
        kvkNumber: 0,
    });

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    const handleChange = (e) => {
        const { id, value } = e.target;
        setCompany((prevCompany) => ({ ...prevCompany, [id]: value }));
    };

    const handleSubmit = async (e) => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await fetch(`https://localhost:7101/api/account/registerCompany`, {
                method: 'POST',
                headers: {
                    Authorization: `${jwtToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(company),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                console.log('Success!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
        <div>
            <button className='btn btn-success ' onClick={toggle}>Nieuw +</button>
        </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Bedrijf aanmaken</ModalHeader>
        <ModalBody>
        <div className='card'>
            <div className='card-body'>
                <form>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text" id="inputGroup-sizing-lg">
                                Bedrijfsnaam
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                id="companyName"
                                value={company.companyName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text" id="inputGroup-sizing-lg">
                                Email
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={company.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text" id="inputGroup-sizing-lg">
                                Wachtwoord
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={company.password}
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
                                id="kvk"
                                value={company.kvk}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => { 
            toggle(); 
            handleSubmit(); 
            }}>
            Aanmaken
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Sluiten
          </Button>
        </ModalFooter>
      </Modal>
      </>
    );
};

export default CompanyForm;
