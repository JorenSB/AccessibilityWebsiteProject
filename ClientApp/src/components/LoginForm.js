import React, { useState } from 'react';
import './LoginForm.css';
import Logo from './media/logo.png';
import { Link } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await fetch('https://localhost:7101/api/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ UserName: username, Password: password }),
            });
    
            const contentType = response.headers.get('content-type');
            const data = contentType && contentType.includes('application/json') ? await response.json() : null;
    
            if (response.ok) {
                setLoginMessage('Je bent ingelogd! ');
                // Additional logic for successful login
            } else {
                const errorMessage = data?.Message || 'Er is iets fout gegaan. Probeer opnieuw(else).';
                setLoginMessage(errorMessage);
                // Additional logic for login error
            }
        } catch (error) {
            console.error('Error during login:', error);
            setLoginMessage('Er is iets fout gegaan. Probeer opnieuw(catch).');
        }
    };
    

    return (
        <div className='wrapper'>
            <form>
                <img className='logo-img' src={Logo} alt='logo accessibilty.nl'></img>
                <div className='input-box'>
                    <input type='text' placeholder='Gebruikersnaam' required onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Wachtwoord' required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='forgot-register'>
                    <a href='#'>Wachtwoord vergeten</a>
                    <Link to='/registerexpert'>Registreer</Link>
                </div>
                <button className='button' type='button' onClick={handleLogin}>Login</button>
            </form>

            {loginMessage && <h1>{loginMessage}</h1>}
        </div>
    );
}

export default LoginForm;
