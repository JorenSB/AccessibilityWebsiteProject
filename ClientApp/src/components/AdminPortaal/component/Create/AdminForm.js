import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AdminForm = () => {
    const [adminForm, setAdminForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [modal2, setModal2] = useState(false);
    const toggleAdmin = () => setModal2(!modal2);

    const handleAdminChange = (e) => {
        const { id, value } = e.target;
        setAdminForm((prevAdmin) => ({ ...prevAdmin, [id]: value }));
    };

    const handleAdminSubmit = async () => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await fetch(`https://localhost:7101/api/portaal/admin/create/admin`, {
                method: 'POST',
                headers: {
                    Authorization: `${jwtToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adminForm),
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
            <button className='btn btn-warning ' onClick={toggleAdmin}>Nieuwe Admin aanmaken +</button>
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
                                value={AdminForm.firstName}
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
                                value={AdminForm.lastName}
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
                                value={AdminForm.email}
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
                                id="password"
                                value={AdminForm.password}
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
