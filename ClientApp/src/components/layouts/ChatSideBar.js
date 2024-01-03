import React from 'react';
//import $ from 'jquery';
export default class ChatSideBar extends React.Component {

  

  render() {
    return (
      <div className='d-none d-lg-block d-xl-block col-lg-2 col-0'>
        <div id='sideBar' className="d-flex flex-column flex-shrink-0 p-3">
        <ul className="listGroup nav nav-pills flex-column mb-auto ">
          <li className="nav-item my-1">
            <button className="nav-link text-center" aria-current="page">
              Nieuwe Chat
            </button>
          </li>

          <hr/>

          <li className="listItem nav-item my-1">
            <button className="nav-link text-center active" aria-current="page">
              Een Chat 1
            </button>
          </li>
          <li className="listItem nav-item my-1">
            <button  className=" nav-link text-center">
              Een Chat 2
            </button>
          </li >
          <li className="listItem nav-item my-1">
            <button  className=" nav-link text-center">
              Een Chat 3
            </button>
          </li >
          
          
        </ul>
      </div>
    </div>
    );
  }
}