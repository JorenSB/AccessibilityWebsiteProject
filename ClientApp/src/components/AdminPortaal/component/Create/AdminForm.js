import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AdminForm = () => {
    const [admin, setAdmin] = useState({
        firstName: '',
        lastName: '',
        email: '',
        newPassword: '',
    });

    const [modal2, setModal2] = useState(false);
    const toggleAdmin = () => setModal2(!modal2);

    const handleAdminChange = (e) => {
        const { id, value } = e.target;
        setAdmin((prevAdmin) => ({ ...prevAdmin, [id]: value }));
    };

    const handleAdminSubmit = async (e) => {
        e.preventDefault();
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await fetch(`https://localhost:7101/api/portaal/admin/create/admin`, {
                method: 'POST',
                headers: {
                    Authorization: `${jwtToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(admin),
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
            <button className='btn btn-success ' onClick={toggleAdmin}>Nieuw +</button>
        </div>

      <Modal isOpen={modal2} toggle={toggleAdmin}>
        <ModalHeader toggle={toggleAdmin}>Admin aanmaken</ModalHeader>
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
                                value={admin.firstName}
                                onChange={handleAdminChange}
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
                                value={admin.lastName}
                                onChange={handleAdminChange}
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
                                value={admin.email}
                                onChange={handleAdminChange}
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
                                id="newPassword"
                                value={admin.newPassword}
                                onChange={handleAdminChange}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => { 
            toggleAdmin(); 
            handleAdminSubmit();
            this.props.fetchData();
            }}>
            Aanmaken Admin!
          </Button>{' '}
          <Button color="secondary" onClick={() => { 
            toggleAdmin();
            }}>
            Sluiten
          </Button>
        </ModalFooter>
      </Modal>
      </>
    );
};

export default AdminForm;
