import React, { useState } from 'react';
import './LoginForm.css';
import Logo from '../media/logo.png';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState(null);

    const navigate = useNavigate();

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
                var role = data.role || '';

                if(role === "Expert"){
                    //console.log("gelukt",response,data,role);
                    navigate("/deskundige");
                }   
                else if(role === "Company"){
                    //console.log("mislukt",response,data,role);
                    navigate("/bedrijf");
                }else{
                    console.log("mislukt tijdens het inloggen");
                }
            } else {
                console.log("er is iets fout gegaan tijdens het inloggen",data);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setLoginMessage('Er is iets fout gegaan. neem contact op met ons.');
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
                    <Link to='/registreerdeskundige'>Registreer</Link>
                </div>
                <button className='button' type='button' onClick={handleLogin}>Login</button>
            </form>

            <h1>{loginMessage}</h1>
        </div>
    );
}

export default LoginForm;
