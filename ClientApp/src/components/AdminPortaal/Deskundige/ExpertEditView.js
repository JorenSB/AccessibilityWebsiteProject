import React from 'react';
import Layout from '../AdminPortaalLayout';
import Experts from '../component/FetchExpertEdit';

export default class Bedrijvenview extends React.Component {
  render() {
    return (
        <Layout>
          <div className='row'>
            <div className='col-6'><h1>Bekijk Ervaringsdeskundige</h1></div>
          </div>
          <Experts/>  
        </Layout>
    )
  }
}
