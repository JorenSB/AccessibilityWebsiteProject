import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';

const AdminForm = () => {
    const [admin, setAdmin] = useState({
        firstName: '',
        lastName: '',
        email: '',
        newPassword: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setAdmin((prevAdmin) => ({ ...prevAdmin, [id]: value }));
    };

    const handleSubmit = async (e) => {
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
        <div>
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
                            Email
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
                            Wachtwoord
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

                <button type="submit" className="btn btn-primary">
                    aanmaken
                </button>
            </form>
        </div>
    );
};

export default AdminForm;
