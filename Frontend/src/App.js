import React, { Component } from 'react';
import './App.css';
import ViewSelector from './ViewSelector.js';

class App extends Component {
  render() {
    return (<div>
		<div className="header"><span className="brandTag font-effect-3d">OLSSONS</span><span className="brandTag2">BILAR</span></div>
      <div className="App">
        <ViewSelector/>
      </div>
			</div>
    );
  }
}

export default App;
