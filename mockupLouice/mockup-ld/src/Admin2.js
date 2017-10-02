import React, { Component } from 'react';
import './App.css';

class Admin2 extends Component {
  render() {
    return (
      <div className="container">
        <div className="subHeader">
          <button className="btnAdm">Alla fordon</button>
          <button className="btnAdm active">Lägg till</button>
          
          <button className="btnAdm">Uppdatera</button>
          <button className="btnAdm">Radera</button>
        </div>
      </div>
    );
  }
}

export default Admin2;