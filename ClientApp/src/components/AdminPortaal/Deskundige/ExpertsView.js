import React from 'react';
import Layout from '../AdminPortaalLayout';
import Experts from '../component/FetchExperts';
import ExpertForm from '../component/Create/ExpertForm';

export default class Bedrijvenview extends React.Component {
  render() {
    return (
        <Layout>
          <div className='row'>
            <div className='col-md-10 col-lg-10 col-12'><h1 className='text-decoration-underline'>Hier zijn alle Ervaringsdeskundige</h1></div>
            <div className='col-md-2 col-lg-2 col-12 text-center'><ExpertForm/></div>
          </div>
          <Experts/>  
        </Layout>
    )
  }
}
