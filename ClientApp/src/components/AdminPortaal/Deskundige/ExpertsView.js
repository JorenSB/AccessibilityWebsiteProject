import React from 'react';
import Layout from '../AdminPortaalLayout';
import Experts from '../component/FetchExperts';

export default class Bedrijvenview extends React.Component {
  render() {
    return (
        <Layout>
            <h1 className='text-decoration-underline'>Hier zijn alle Ervaringsdeskundige</h1>
            <Experts/>  
        </Layout>
    )
  }
}
