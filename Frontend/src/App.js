import React, { Component } from 'react';
import './App.css';
import Login from './Login.js';

class App extends Component {
  render() {
    return (<div>
		<div className="header"><span className="brandTag">OLSSONS</span><span className="brandTag2">BILAR</span></div>
      <div className="App">
        <Login/>
      </div>
			</div>
    );
  }
}

export default App;
