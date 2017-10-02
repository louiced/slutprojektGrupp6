import React, { Component } from 'react';
import './App.css';

class Login extends Component {
  render() {
    return (
      <div className="container flex-row">
        <div className="registrera flex-col">
          <h4>Ny användare</h4>
          <input type="text" placeholder="Förnamn"></input>
          <input type="text" placeholder="Efternamn"></input>
          <input type="text" placeholder="E-post"></input>
          <input type="password" placeholder="Lösenord"></input>
          <button className="btn">Registrera</button>
        </div>
        
        <div className="login flex-col">
          <h4>Logga in</h4>
          <input type="text" placeholder="Användarnamn/e-post"></input>
          <input type="password" placeholder="Lösenord"></input>
          <label for="rememberMe">
            <input id="rememberMe" type="checkbox" checked></input>
            Håll mig inloggad
          </label>
          <button className="btn">Logga in</button>
        </div>
      </div>
    );
  }
}

export default Login;