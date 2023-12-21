import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button,
  } from 'reactstrap';
import PropTypes from 'prop-types';

export default class ChatSideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='sideBar' className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark fixed" style={{width: "200px", height: "100vh", position: "fixed"}}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">Sidebar</span>
        </a>
        <hr/>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              
              Orders
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              
              Products
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              
              Customers
            </a>
          </li>
        </ul>
        <hr/>
        {/* Profile */}
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
      // <div className='chatBar' style={{width:'300px', height: '100%', }}>
      //   <Navbar color="primary" light container="flex">
      //     <NavbarBrand href="/">Gekke test Sidebar</NavbarBrand>
      //         <Nav className="mb-auto" navbar>
      //         <NavItem>
      //             <NavLink href="/components/">Components</NavLink>
      //         </NavItem>
      //         <NavItem>
      //             <NavLink href="https://github.com/reactstrap/reactstrap">
      //             GitHub
      //             </NavLink>
      //         </NavItem>
      //         <UncontrolledDropdown nav inNavbar>
      //             <DropdownToggle nav caret>
      //             Options
      //             </DropdownToggle>
      //             <DropdownMenu end>
      //             <DropdownItem>Option 1</DropdownItem>
      //             <DropdownItem>Option 2</DropdownItem>
      //             <DropdownItem divider />
      //             <DropdownItem>Reset</DropdownItem>
      //             </DropdownMenu>
      //         </UncontrolledDropdown>
      //         </Nav>
      //   </Navbar>
      // </div>
    );
  }
}