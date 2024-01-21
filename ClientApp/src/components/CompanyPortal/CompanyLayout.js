import React from 'react';
import CompanyNavBar from './CompanyNavBar';
import ChatSideBar from '../layouts/ChatSideBar';
import PropTypes from 'prop-types';
import './CompanyLayout.css'

export default class CompanyLayout extends React.Component {
  render() {
    return (
      <div id='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <CompanyNavBar />
          </div>
        </div>
        <div className='row'>
          <div className='container-fluid'>

            <div className='row'>
              <ChatSideBar />
              <div className='col-md-10 col-12'>
                <div className='row p-3'>
                  <div id='PageContent' className='col-12 text-center'>
                    {this.props.children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CompanyLayout.propTypes = {
  children: PropTypes.node,
};
