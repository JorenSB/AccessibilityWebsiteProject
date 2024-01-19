import React from 'react';
import { Link } from 'react-router-dom';
import brandLogo from '../media/logo.png';
import LogoutButton from './LogoutButton';

import './DeskundigeBaseLayout.css';

export default class BaseNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
    <header>
      <nav id='navBar' className="navbar navbar-expand-lg ">
          <div id='DeskundigeNav' className="container-fluid">
              <div className="d-flex flex-grow-1">
                  <span className="w-100 d-lg-none d-block"/>
                  <a id='navBrand' className="navbar-brand text-decoration-none fw-bold text-dark" href="/"><img alt='Logo van Accessibility in NavigatieBalk' src={brandLogo} className='img im-fluid' style={{width : "10rem"}}></img>  Deskundige Portaal </a>
                  <div className="w-100 text-right">
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar7">
                          <span className="navbar-toggler-icon"></span>
                      </button>
                  </div>
              </div>  	
              <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar7">
                  <ul className="navbar-nav ms-auto flex-nowrap">
                      <li className="nav-item">
                          <Link className='nav-link text-dark' to='/deskundige/onderzoeken'>Onderzoeken</Link>
                      </li>
                      <li className="nav-item">
                          <Link className='nav-link text-dark' to='/deskundige/inschrijvenonderzoek'>Inschrijven Onderzoek</Link>
                      </li>
                      <li className="nav-item">
                          <Link className='nav-link text-dark' to='/deskundige/profiel'>Mijn Profiel</Link>
                      </li>
                      <li className="nav-item">
                          <LogoutButton />
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
    </header>
    );
  }
}