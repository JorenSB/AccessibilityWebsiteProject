import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Nav from './AdminPortaalNav';
import SideBar from '../layouts/ChatSideBar';
import PropTypes from 'prop-types';
import { jwtIsValid } from '../../Auth'; 

export default function AdminPortaalLayout({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtIsValid()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <div className='row'>
        <div className='col-12'>
          <Nav />
        </div>
      </div>
      <div className='row'>
        <div className='container-fluid'>
          <div className='row'>
            <SideBar />
            <div className='col-md-10 col-12 pt-3'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

AdminPortaalLayout.propTypes = {
  children: PropTypes.node,
};
