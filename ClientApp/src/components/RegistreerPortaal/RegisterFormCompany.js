import React, { useState } from 'react';
import './RegisterForm.css';
import Logo from '../media/logo_met_text_transparant.png';
import { Link, useNavigate } from 'react-router-dom';

function RegisterFormCompany() {
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [kvk, setKVK] = useState('');
    const [password, setPassword] = useState('');
    const [registerMessage, setRegisterMessage] = useState(null);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://localhost:7101/api/account/registerCompany', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    CompanyName: companyName,
                    Email: email,
                    KVK: kvk,
                    Password: password
                }),
            });

            const contentType = response.headers.get('content-type');

            const data = contentType && contentType.includes('application/json') ? await response.json() : null;

            if (response.ok) {
                setRegisterMessage('Registratie succesvol!'); 
                navigate("/");
            } else {
                const responseData = data || {};
                const errorMessage = responseData?.message || 'Er is iets fout gegaan. Probeer opnieuw.';

                setRegisterMessage(errorMessage);
            }
        } catch (error) {
            if(error){
                console.error('Fout tijdens registratie:', error);
                setRegisterMessage('Er is iets fout gegaan. Probeer opnieuw (catch).');
            }
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleRegister}>
                <img className='logo-img' src={Logo} alt='logo accessibility.nl'></img>
                <h3 className='title'>Bedrijfs Registratie</h3>
                <div className='input-box'>
                    <input className='input' type='text' placeholder='Bedrijfsnaam' required onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input className='input' type='email' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input className='input' type='text'placeholder='KVK-nummer' required onChange={(e) => setKVK(e.target.value)}/>
                </div>
                <div className='input-box'>
                    <input className='input' type='password' placeholder='Wachtwoord' pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$" title="Minimaal 1 hoofdletter, 1 vreemd teken en 8 karakters." required  onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className='RegistreerButton' type='submit'>
                    Registreer
                </button>
            </form>
            <Link to="/registreerdeskundige">Registreer als expert</Link>
            
           <h1 className='registerMsg'>{registerMessage}</h1>
        </div>
    );
}

export default RegisterFormCompany;
