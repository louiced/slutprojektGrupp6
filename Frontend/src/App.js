import React, { Component } from 'react';
import './App.css';
import ViewSelector from './ViewSelector.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}
	
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
