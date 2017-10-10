import React, { Component } from 'react';
import './App.css';
import ViewSelector from './ViewSelector.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInAs: ''
		};
		this.updateUserInfo = this.updateUserInfo.bind(this);
	}
	
  render() {
    return (
		<div>
			<div className="header">
				<span className="brandTag font-effect-3d">OLSSONS</span>
				<span className="brandTag2">BILAR</span>
			</div>
			<div className="userInfo">
				<button className="btn" onClick={}>LOGGA UT</button>
				<p>Inloggad som {this.state.loggedInAs.name.first}</p>
			</div>
			<div className="App">
				<ViewSelector updateUserInfo={this.updateUserInfo}/>
			</div>
		</div>
    );
  }
	
	updateUserInfo(user) {
		this.setState({
			loggedInAs: user
		})
	}
}

export default App;
