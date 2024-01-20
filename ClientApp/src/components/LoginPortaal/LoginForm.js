import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import Logo from '../media/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"
import { isAuthenticated, getUserRole } from '../../Auth';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7101/api/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ UserName: email, Password: password }),
            });
            const contentType = response.headers.get('content-type');
            const data = contentType && contentType.includes('application/json') ? await response.json() : null;

            if (response.ok) {
                var jwtToken = data.token || '';

                if (jwtToken) {
                    localStorage.setItem('jwtToken', jwtToken);

                    const decodedToken = jwtDecode(jwtToken);
                    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || '';

                    if (role === "Expert") {
                        navigate("/deskundige/profiel");
                    } else if (role === "Company") {
                        navigate("/company");
                    } else if (role === "Admin") {
                        navigate("/admin/deskundigen");
                    }else {
                        console.log("mislukt tijdens het inloggen", "role = " + role);
                    }
                } else {
                    console.log("Geen JWT-token ontvangen na succesvol inloggen");
                }
            } else {
                console.log(setLoginMessage(data.message));
            }
        } catch (error) {
            console.error('Error during login:', error);
            setLoginMessage('Er is iets fout gegaan. Neem contact op met ons.');
        }


    };
    useEffect(() => {
        const checkLocalStorage = () => {
          if (isAuthenticated()) {
            const role = getUserRole();
      
            if (role === "Expert") {
                navigate("/deskundige");
            } else if (role === "Company") {
                navigate("/company");
            } else if (role === "Admin") {
                navigate("/admin")
            }
          }
            if (isAuthenticated()) {
                const role = getUserRole();

                if (role === 'Expert') {
                    navigate('/deskundige/profiel');
                } else if (role === 'Company') {
                    navigate('/company/profile');
                }
            }
        };

        checkLocalStorage();
    }, []);
    return (
        <div className='wrapper'>
            <form onSubmit={handleLogin}>
                <img className='logo-img' src={Logo} alt='logo accessibilty.nl'></img>
                <div className='input-box'>
                    <input className='input' type='text' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='input-box'>
                    <input className='input' type='password' placeholder='Wachtwoord' required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='forgot-register'>
                    <a href='#'>Wachtwoord vergeten</a>
                    <Link to='/registreerdeskundige'>Registreer</Link>
                </div>
                <button className='LoginButton' type='submit'>Login</button>
            </form>

            <p className='loginMessage'>{loginMessage}</p>
        </div>
    );
}

export default LoginForm;
