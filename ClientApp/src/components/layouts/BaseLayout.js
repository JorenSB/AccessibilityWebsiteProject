import React from 'react';
import Nav from './BaseNavbar'
import SideBar from './ChatSideBar'
import PropTypes from 'prop-types'; 
import './BaseLayout.css'

export default class BaseLayout extends React.Component {
  render() {
    return (
    <div id='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <Nav />
        </div>
      </div>
      <div className='row'>
        <div className='container-fluid'>
          {/* Nav height Filler */}
          <div className='row filler'></div>
          {/* End Nav Height Filler */}

          <div className='row'>
            <SideBar />
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

BaseLayout.propTypes = {
  children: PropTypes.node, 
};
