import React from 'react';
import PropTypes from 'prop-types';
import Nav from './BaseNavbar';
import SideBar from './ChatSideBar';
import './BaseLayout.css';

export default class BaseLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='main'>
        <Nav />
        <div className='row'>
          <div className='col-1' style={{ width: '8%' }}>
            <SideBar />
          </div>
          <div id='contentRow' className='col-11'>
            <div id='content'>
              <div className='container'>{this.props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BaseLayout.propTypes = {
  children: PropTypes.node, // PropType for children, which can be any node (HTML, components, etc.)
};
