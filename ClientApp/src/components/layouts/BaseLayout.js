import React from 'react';
import PropTypes from 'prop-types';
import Nav from './BaseNavbar'
import SideBar from './ChatSideBar'
import './BaseLayout.css'

export default class BaseLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div id='main'>
          <Nav />
          <div className='row'>
            <div className='col-1' style={{width: '8%'}}>
              <SideBar />
            </div>
            <div id='contentRow'  className='col-11'>
            <div id='content'>
                  <div className='container'>
                      <div className='row'>
                          <div className='col-6 bg-danger' style={{height: '100vh'}}>test</div>
                          <div className='col-6 bg-success' style={{height: '100vh'}}>test</div>
                      </div>
                  </div>
            </div>
          </div>
          </div>
        </div>
    );
  }
}