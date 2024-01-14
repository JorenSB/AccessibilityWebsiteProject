import React from 'react';
import '../layouts/BaseLayout.css';
import img from "../media/placeholder.svg";
import "./AdminPortaal.css"

export default class Example extends React.Component {
    render() {
      return (
        <div className='container-fluid h-100' style={{height: "100vh"}}>
          <div className='row h-100' >
            <div className='col-4 d-flex justify-content-center align-items-center'>
              <div className="card" style={{width: "18rem"}}>
              <div className='d-flex justify-content-center align-items-center'><img className="img-rond" height={100} width={100} src={img} alt="test"/></div>
                

                <div className="card-body text-center">
                  <h5 className="card-title text-center">Card title</h5>
                  <p className="card-text text-center">Sugma Dick</p>
                  <a href="/" className="btn btn-primary text-center">Go somewhere</a>
                </div>
              </div>
            </div>
            <div className='col-4' style={{background: "red"}}></div>
            <div className='col-4' style={{background: "blue"}}></div>
          </div>
        </div>
      );
    }
  }