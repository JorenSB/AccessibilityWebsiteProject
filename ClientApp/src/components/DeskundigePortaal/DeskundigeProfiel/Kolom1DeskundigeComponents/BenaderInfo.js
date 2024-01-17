import React, { useEffect, useState } from 'react';
import './BenaderInfo.css';

function BenaderInfo(props) {
  const [benaderIsChecked, setBenaderIsChecked] = useState(false);
  const [emailpreferenceIsChecked, setEmailPrefereneceIsChecked] = useState(false);
  const [phonePreferenceIsChecked, setPhonePreferenceIsChecked] = useState(false);

  useEffect(() => {
    setBenaderIsChecked(props.commercial);
    if (props.commercial) {
      setEmailPrefereneceIsChecked(props.emailPreference);
      setPhonePreferenceIsChecked(props.phonePreference);
    }
  }, [props.commercial, props.emailPreference, props.phonePreference]);

  useEffect(() => {
    handleDataUpdate({
      benaderIsChecked: benaderIsChecked,
      emailpreferenceIsChecked: emailpreferenceIsChecked,
      phonePreferenceIsChecked: phonePreferenceIsChecked,
    });
  }, [benaderIsChecked, emailpreferenceIsChecked, phonePreferenceIsChecked]);

  const handleDataUpdate = (updatedData) => {
    if (props.onUpdateData) {
      props.onUpdateData(updatedData);
    }
  };

  return (
    <div className='benaderInfo'>
      <div className='left'>
        <p>Wilt u benaderd worden door commerciële partijen?</p>
        {benaderIsChecked && (
          <>
            <p>U wilt telefonisch benaderd worden</p>
            <p>U wilt via de email benaderd worden</p>
          </>
        )}
      </div>

      <div className='right'>
        <input
          className='checkbox'
          onChange={() => setBenaderIsChecked(!benaderIsChecked)}
          checked={benaderIsChecked}
          type="checkbox"
        />
        {benaderIsChecked && (
          <>
            <input
              className='checkbox'
              onChange={() => setPhonePreferenceIsChecked(!phonePreferenceIsChecked)}
              checked={phonePreferenceIsChecked}
              type="checkbox"
            />
            <input
              className='checkbox'
              onChange={() => setEmailPrefereneceIsChecked(!emailpreferenceIsChecked)}
              checked={emailpreferenceIsChecked}
              type="checkbox"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default BenaderInfo;
