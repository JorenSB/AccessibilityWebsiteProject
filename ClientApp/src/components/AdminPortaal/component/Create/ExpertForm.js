import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ExpertForm = () => {
    const [expert, setExpert] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setExpert((prevExpert) => ({ ...prevExpert, [id]: value }));
    };

    const handleSubmit = async (e) => {
        //e.preventDefault();
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await fetch(`https://localhost:7101/api/account/registerExpert`, {
                method: 'POST',
                headers: {
                    Authorization: `${jwtToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expert),
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
        <ModalHeader toggle={toggle}>Deskundige aanmaken</ModalHeader>
        <ModalBody>
        <div className='card'>
            <div className='card-body'>
                <form>
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text" id="inputGroup-sizing-lg">
                                Voornaam
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                value={expert.firstName}
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
                                value={expert.lastName}
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
                                value={expert.email}
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
                                value={expert.password}
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
          <Button color="secondary" onClick={() => { 
            toggle(); 
            }}>
            Sluiten
          </Button>
        </ModalFooter>
      </Modal>
      </>
    );
};

export default ExpertForm;
