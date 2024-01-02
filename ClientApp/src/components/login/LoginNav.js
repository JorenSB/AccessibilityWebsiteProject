import React from 'react';
import './LoginNav.css';
import burgier from '../media/menu-regular-24.png';
import burgierClose from '../media/x-regular-24.png';
import Logo from '../media/logo.png';



function LoginNav() {
  return (
    <header >
      <img className='logo' src={Logo} alt="Logo" />

      <input type='checkbox' id='check'></input>
      <label htmlFor="check" className="icons">
        <img id="menu-icon" src={burgier} alt="Menu" />
        <img id="close-icon" src={burgierClose} alt="close menu" />
      </label>

      <nav className='navbar'>
        <a href="#">Actueel</a>
        <a href="#">Toegankelijkheid</a>
        <a href="#">Hoe wij helpen</a>
        <a href="#">Sectoren</a>
        <a href="#">Casussen</a>
        <a href="#">Over ons</a>
        <a href="#">Contact</a>
        <a href="#">Login</a>
      </nav>
    </header>
  );
}

export default LoginNav;