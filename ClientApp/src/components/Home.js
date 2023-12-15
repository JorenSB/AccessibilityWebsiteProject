import React, { Component } from 'react';
import chipi from './media/chipi-chipi-chapa-chapa.mp4';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <section id="main">
        <video autoPlay muted loop id="myVideo">
            <source src={chipi} type="video/mp4"/>
        </video>
        <div className="content text-center">
            <h1>Chipi-Chipi Chapa-Chapa</h1>
            <p>We Are Going Insane...</p>
        </div>
    </section>
    </div>
    );
  }
}
