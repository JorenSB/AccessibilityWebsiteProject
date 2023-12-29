import React, { useState } from 'react';
import './RegisterForm.css';
import Logo from './media/logo.png';
import { Link } from 'react-router-dom';


function RegisterFormExpert() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [registerMessage, setRegisterMessage] = useState(null);

    const handleRegister = async () => {
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
                console.log(email,firstName, lastName,password);
            }
        } catch (error) {
            console.error('Fout tijdens registratie:', error);
            setRegisterMessage('Er is iets fout gegaan. Probeer opnieuw (catch).');
        }
    };

    return (
        <div className='wrapper'>
            <form>
                <img className='logo-img' src={Logo} alt='logo accessibility.nl'></img>
                <h3 className='title'>Registreer als Deskundige</h3>
                <div className='input-box'>
                    <input type='text' placeholder='Voornaam' required onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='Achternaam' required onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Wachtwoord' required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Link to="/registercompany">Registreer als bedrijf</Link>
                <button className='button' type='button' onClick={handleRegister}>Registreer</button>
            </form>

            {registerMessage && <h1>{registerMessage}</h1>}
        </div>
    );
}

export default RegisterFormExpert;
