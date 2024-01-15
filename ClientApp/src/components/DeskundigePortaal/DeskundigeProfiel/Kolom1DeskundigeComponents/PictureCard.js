import React from 'react';
import './PictureCard.css';


function PictureCard(props) {
  const fullName = `${props.firstName ?? 'Default'} ${props.lastName ?? 'user'}`;

  return (
    <div className="card">
      <div className='pic'></div>
      <div className="container">
        <h4><b>{fullName}</b></h4>
        <p>{props.phoneNumber ?? "06-12345678"}</p>
      </div>  
    </div>
  );
}

export default PictureCard;
