import React from 'react';
import { Link } from 'react-router-dom';
import brandLogo from '../media/logo_met_text_transparant.png';

import './BaseLayout.css';

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
          <div id='AdminNav' className="container-fluid">
              <div className="d-flex flex-grow-1">
                  <span className="w-100 d-lg-none d-block"/>
                  <a id='navBrand' className="navbar-brand text-decoration-none fw-bold text-dark" href="/"><img className='img img-fluid' alt='Logo van Accessibility in NavigatieBalk' src={brandLogo} style={{width : "15rem"}}></img>  Admin Portaal </a>
                  <div className="w-100 text-right">
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar7">
                          <span className="navbar-toggler-icon"></span>
                      </button>
                  </div>
              </div>
              <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar7">
                  <ul className="navbar-nav ms-auto flex-nowrap">
                      <li className="nav-item">
                          <Link className='nav-link text-dark' to='/admin/bedrijven'>Bedrijven</Link>
                      </li>
                      <li className="nav-item">
                          <Link className='nav-link text-dark' to='/admin/deskundigen'>ErvaringsDeskundigen</Link>
                      </li>
                      <li className="nav-item">
                          <Link className='nav-link text-dark' to='/admin/profiel'>Mijn Profiel</Link>
                      </li>
                      <li className="nav-item">
                          <Link className='nav-link text-dark' to='/'>Log Out</Link>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
    </header>
    );
  }
}