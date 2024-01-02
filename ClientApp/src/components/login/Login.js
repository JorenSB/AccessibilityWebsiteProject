import React from 'react';
import LoginNav from './LoginNav'
import LoginForm from './LoginForm';

function Login() {
  return (
    <div className=''>
        <LoginNav/>
      <div className='body'>
        <LoginForm/>
      </div>
    </div>
  );
}

export default Login;
