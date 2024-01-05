import React from 'react';

import FetchBedrijven from './component/FetchBedrijven';

export default class AdminPortaal_Bedrijven extends React.Component {
  render() {
    return (
    <div id='container-fluid'>
        <div className='row'>
            <div className='col-12'>
                {/* Bedrijf data test */}
                <FetchBedrijven/>
            </div>
        </div>
    </div>
    );
  }
}

