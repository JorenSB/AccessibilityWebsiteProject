import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Layout from '../AdminPortaalLayout';

import AdminForm from '../component/Create/AdminForm';
import placeholderImg from '../../media/placeholder.svg';

const AdminProfileView = () => {
    const [admin, setAdmin] = useState({
        firstName: '',
        lastName: '',
        email: '',
        newPassword: '',
    });
        
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
        
    const handleChange = (e) => {
        const { id, value } = e.target;
        setAdmin((prevExpert) => ({ ...prevExpert, [id]: value }));
        
    };
    
    const FetchAdmin = async () => {
        try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await fetch(`https://localhost:7101/api/portaal/admin/profile`, {
            method: "GET",
            headers: {
            Authorization: `${jwtToken}`,
            },
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            const data = await response.json();
            setAdmin(data);
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };
    
    const handleSubmit = async (e) => {
        try {
        e.preventDefault();
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await fetch(`https://localhost:7101/api/portaal/admin/profile`, {
            method: "PUT",
            headers: {
            Authorization: `${jwtToken}`,
            'Content-Type': 'application/json', // Make sure to set the content type
            },
            body: JSON.stringify(admin),
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
    
    useEffect(() => {
        FetchAdmin();
    }, []);
    
    useEffect(() => {
        console.log("Updated Expert State:", admin);
    }, [admin]);
    
    return (
        <Layout>
            <div className='container-fluid'>
                {/* Titel Row */}
                <div className='row'>
                <div className='col-8'><h1>Admin Gegevens</h1></div>
                <div className='col-4'><AdminForm/></div>
                </div>
                {/* First fromulier row */}
                <div className='row h-50'>
                {/* column voor de profile card */}
                <div className='col-5'>
                    <div className="card bg-primary">
                        <div className='d-flex justify-content-center align-items-center'>
                            <img className="img-rond p-3" height={300} width={300} src={placeholderImg} alt="test"/>
                        </div>
                        <div className="card-body text-center">
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text disabled" id="addon-wrapping">@</span>
                                <input type="text" readOnly={true} className="form-control" value={admin.firstName + ' ' + admin.lastName + ' | ' + admin.email}  placeholder="Gebruikersnaam..." aria-label="Username" aria-describedby="addon-wrapping"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fill Colmn */}
                <div className='col-2'></div>

                {/* Column voor de aanpasbare gegevens */}
                <div className='col-5'>
                    <h3 className='text-center'>Aanpasbaren gegevens</h3>

                    {/* EditForm */}
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
                            value={admin.firstName}
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
                                value={admin.lastName}
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
                                value={admin.email}
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
                                value={admin.newPassword}
                                onChange={handleChange}
                                />
                            </div>
                        </div>
                       
                        <div className="mb-3 text-center">
                            <div className='row'>
                                <div class="d-grid gap-2 col-12 mx-auto">
                                    <button type="submit" className="btn btn-success">
                                    Opslaan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className='col-12'>
                        <div className="mb-3 text-center">
                          <Link className='btn btn-secondary' to={'/admin/bedrijven'}>Terug naar bedrijven overzicht</Link>
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>
        </Layout>
    )
}
export default AdminProfileView;