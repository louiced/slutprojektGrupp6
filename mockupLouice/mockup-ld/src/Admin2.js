import React, { Component } from 'react';
import './App.css';

class Admin2 extends Component {
  render() {
    return (
      <div className="container flex-col">
        <div className="subHeader">
          <button className="btnAdm">Alla fordon</button>
          <button className="btnAdm active">Lägg till</button>
          
          <button className="btnAdm">Uppdatera</button>
          <button className="btnAdm">Radera</button>
        </div>
        
        <div>
          <h4>Lägg till nytt fordon</h4>
          <form>
            <input type="text" placeholder="Fordonstyp"></input>
            <input type="text" placeholder="Behörighet"></input>
            <input type="text" placeholder="Märke"></input>
            <input type="text" placeholder="Modell"></input>
            <input type="text" placeholder="År"></input>
            <input type="text" placeholder="Växellåda"></input>
            <input type="text" placeholder="Hyra"></input>
            <input type="text" placeholder="Kommentar"></input>
          </form>
          <button className="okBtn">Lägg till</button>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default Admin2;