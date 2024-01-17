import React, { useState, useEffect } from 'react';
import './PictureCard.css';

function PictureCard(props) {
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    handleDataUpdate({ firstName: firstName === '' ? null : firstName, phoneNumber: phoneNumber === '' ? null : phoneNumber });
  }, [firstName, phoneNumber]);

  const handleDataUpdate = (updatedData) => {
    if (props.onUpdateData) {
      props.onUpdateData(updatedData);
    }
  };

  return (
    <div className="card">
      <div className='pic'></div>
      <div className="container">
        <div className='cardInput'>
          <input onChange={e => setFirstName(e.target.value)} type="text" id="name" name="name" placeholder={props.firstName} />
        </div>
        <div className='cardInput'> 
          <input onChange={e => setPhoneNumber(e.target.value)} type="tel" id="phoneNumber" name="phoneNumber" placeholder={props.phoneNumber ?? "Voer een telefoonNummer in"} />
        </div>
      </div>
    </div>
  );
}

export default PictureCard;
