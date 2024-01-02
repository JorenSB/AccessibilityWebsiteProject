import React, { useState } from 'react';
import './RegisterForm.css';
import Logo from '../media/logo.png';
import { Link } from 'react-router-dom';

function RegisterFormExpert() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [registerMessage, setRegisterMessage] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7101/api/account/registerExpert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: email,
                    Password: password,
                    FirstName: firstName,
                    LastName: lastName  
                }),
            });

            const contentType = response.headers.get('content-type');

            const data = contentType && contentType.includes('application/json') ? await response.json() : null;

            if (response.ok) {
                setRegisterMessage('Registratie succesvol!'); 
            } else {
                const errorMessage = data?.Message || 'Er is iets fout gegaan. Probeer opnieuw (else).';
                setRegisterMessage(errorMessage);
            }
        } catch (error) {
            console.error('Fout tijdens registratie:', error);
            setRegisterMessage('Er is iets fout gegaan. Probeer opnieuw (catch).');
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleRegister}>
                <img className='logo-img' src={Logo} alt='logo accessibility.nl'></img>
                <h3 className='title'>Registreer als Deskundige</h3>
                <div className='input-box'>
                    <input type='text' placeholder='Voornaam' required onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='Achternaam' required onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input type='email' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Wachtwoord' pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$" title="Minimaal 1 hoofdletter, 1 vreemd teken en 8 karakters." required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='button' type='submit'>
                    Registreer
                </button>
            </form>
            <Link to="/registreerbedrijf">Registreer als bedrijf</Link>
            <h1 className='registerMsg'>{registerMessage}</h1>
        </div>
    );
}

export default RegisterFormExpert;
