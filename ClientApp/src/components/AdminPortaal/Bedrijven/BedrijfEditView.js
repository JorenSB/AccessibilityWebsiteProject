import React from 'react';
import Layout from '../AdminPortaalLayout';
import Bedrijf from '../component/FetchBedrijfEdit';

export default class Bedrijvenview extends React.Component {
  render() {
    return (
        <Layout>
          <h1>Bekijk Bedrijfsinformatie:</h1>
          <Bedrijf/>  
        </Layout>
    )
  }
}
