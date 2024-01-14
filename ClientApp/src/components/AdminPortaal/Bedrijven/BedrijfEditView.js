import React from 'react';
import Layout from '../AdminPortaalLayout';
import Bedrijf from '../component/FetchBedrijfEdit';

import '../AdminPortaal.css';

export default class Bedrijvenview extends React.Component {
  render() {
    return (
        <Layout>
          <div className='container-fluid h-100'>
            <div className='row'>
              <div className='col-6'><h1>Bekijk informatie:</h1></div>
              <div className='col-6'><h2>Onderzoeken</h2></div>
            </div>

            <Bedrijf/> 
          </div>
        </Layout>
    )
  }
}
