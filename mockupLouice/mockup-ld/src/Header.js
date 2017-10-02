import React, { Component } from 'react';
import './App.css';

class Header extends Component {
  render() {
    return(
      <div className="header flex-col">
        <button id="logoutBtn">Logga in/ut</button>
        <h1>Olssons Fordonsuthyrning</h1>
      </div>
    )
  }
}

export default Header;