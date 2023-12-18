import React from 'react';
import './LoginForm.css';
import Logo from './media/logo.png';



function LoginForm() {
  return (
    
<div className='wrapper'>
        <form action=''>
          <img className='logo-img' src={Logo} alt='logo accessibilty.nl'></img>
          <div className='input-box'>
            <input type='text' placeholder='Gebruikersnaam' required></input>
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Wachtwoord' required></input>
          </div>
          <div className='forgot-register'>
            <a href='#'>Wachtwoord vergeten</a>
            <br />
            <a href='#'>Registreer</a>
          </div>
          <button className='button' type='submit'>Login</button>
        </form>
     </div>
     
  );
}

export default LoginForm;


