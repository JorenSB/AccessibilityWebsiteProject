import React from 'react';
import LoginNav from '../LoginPortaal/LoginNav';
import RegisterFormCompany from './RegisterFormCompany';


function RegisterCompany() {
  return (
    <div>
        <LoginNav />
        <div className='body'>
        <RegisterFormCompany />
        </div>
    </div>
  );
}

export default RegisterCompany;
