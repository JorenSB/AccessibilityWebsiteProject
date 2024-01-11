import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AdminPortaalNav extends React.Component {
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
      <Navbar id='navBar' light expand="xxl" container="fluid">
        <NavbarBrand href="/">Admin Portaal</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse id='nav-modal' className='text-center' isOpen={this.state.isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
               <Link className="nav-link" to="/admin/bedrijven">Bedrijven View</Link>
            </NavItem>
            <NavItem>
               <Link className="nav-link" to="/admin/deskundigen">Deskundige View</Link>
            </NavItem>
          </Nav>
          {/* <NavbarText className='btn text-white' tag={Button} href="/">Profiel Bekijken</NavbarText> */}
        </Collapse>
      </Navbar>
    </header>
    );
  }
}
Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
}
NavbarBrand.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
}