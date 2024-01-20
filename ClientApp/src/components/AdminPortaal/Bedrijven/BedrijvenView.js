import React from 'react';
import Layout from '../AdminPortaalLayout';
import Bedrijven from './AdminPortaal_Bedrijven';
import BedrijfForm from '../component/Create/CompanyForm';


export default class Bedrijvenview extends React.Component {
  render() {
    return (
        <Layout>
            <div className='row'>
              <div className='col-md-10 col-lg-10 col-12'><h1 className='text-decoration-underline'>Hier zijn alle Bedrijven </h1></div>
              <div className='col-md-2 col-lg-2 col-12 text-center'><BedrijfForm/></div>
            </div>
            {/* heeft een div row */}
            <Bedrijven/>
        </Layout>
    )
  }66
}
