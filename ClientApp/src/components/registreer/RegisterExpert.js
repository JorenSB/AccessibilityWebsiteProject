import React from 'react';
import LoginNav from '../login/LoginNav';
import RegisterFormExpert from './RegisterFormExpert';


function RegisterExpert() {
  return (
    <div>
        <LoginNav />
        <div className='body'>
          <RegisterFormExpert />
        </div>
    </div>
  );
}

export default RegisterExpert;
