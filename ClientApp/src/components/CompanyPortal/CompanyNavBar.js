import React from 'react';
import { Link } from 'react-router-dom';
import brandLogo from '../media/logo_met_text_transparant.png';
import LogoutButton from '../layouts/LogoutButton';
import './CompanyLayout.css';

export default class CompanyNavBar extends React.Component {

  constructor(props) {
    super(props)
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
              <span className="w-100 d-lg-none d-block" />
              <a id='navBrand' className="navbar-brand text-decoration-none fw-bold text-dark" href="/"><img className='img img-fluid' alt='Logo van Accessibility in NavigatieBalk' src={brandLogo} style={{ width: "15rem" }}></img>  Bedrijven Portaal </a>
              <div className="w-100 text-right">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar7">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
            </div>
            <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar7">
              <ul className="navbar-nav ms-auto flex-nowrap">
                <li className="nav-item">
                  <Link className='nav-link text-dark' to='/company'>Mijn Onderzoeken</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link text-dark' to='/onderzoek/start'>Onderzoek Starten</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link text-dark' to='/company/profile'>Mijn Profiel</Link>
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