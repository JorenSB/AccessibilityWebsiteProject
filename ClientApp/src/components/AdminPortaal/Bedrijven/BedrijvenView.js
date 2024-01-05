import React from 'react';


import Layout from '../AdminPortaalLayout';
import Bedrijven from './AdminPortaal_Bedrijven';


export default class Bedrijvenview extends React.Component {
  render() {
    return (
        <Layout>
            <Bedrijven/>
        </Layout>
    )
  }
}
