import React, { useEffect } from 'react';
import DeskundigeNavBar from './DeskundigeLayout';
import SideBar from './ChatSideBar';
import PropTypes from 'prop-types';
import { jwtIsValid } from '../../Auth'; 
import { useNavigate } from 'react-router-dom';


export default function DeskundigePortaalLayout({ children }) {
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
          <DeskundigeNavBar />
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

DeskundigePortaalLayout.propTypes = {
  children: PropTypes.node,
};