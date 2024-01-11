import React from 'react';
import Layout from '../AdminPortaalLayout';
import Experts from '../component/FetchExpertEdit';

export default class Bedrijvenview extends React.Component {
  render() {
    return (
        <Layout>
          <h1>Bekijk Ervaringsdeskundige:</h1>
          <Experts/>  
        </Layout>
    )
  }
}
