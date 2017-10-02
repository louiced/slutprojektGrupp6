import React, { Component } from 'react';
import './App.css';

class Admin3 extends Component {
  render() {
    return (
      <div className="container flex-col">
        <div className="subHeader">
          <button className="btnAdm active">Alla fordon</button>
          <button className="btnAdm">Lägg till</button>
          
          <button className="btnAdm">Uppdatera</button>
          <button className="btnAdm">Radera</button>
        </div>
      </div>
    );
  }
}

export default Admin3;