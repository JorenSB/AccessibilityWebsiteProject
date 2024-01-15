import React from 'react';
import './BenaderInfo.css';


function BenaderInfo (){

  return (
    <div className='benaderInfo'>
        <div className='left'>
            <p>wilt u benaderd worden door commerciële partijen?</p>
            <p>u wilt telefonisch benaderd worden</p>
            <p>u wilt via de email benaderd worden</p>
        </div>

        <div className='right'>
            <input className='checkbox' type="checkbox"></input>
            <input className='checkbox' type="checkbox"></input>
            <input className='checkbox' type="checkbox"></input>
        </div>
    </div>

  );
};

export default BenaderInfo;
