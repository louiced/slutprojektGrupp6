import React, { Component } from 'react';
import './App.css';
import BookCar from './bookCar.js';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			view: 'Login'
		}
		this.ccLoginClick = this.ccLoginClick.bind(this);
		this.logOut = this.logOut.bind(this);
	}
	render(){
		switch (this.state.view){
			case 'Login': return <div className="btnBox">
				<button className="btn" onClick={this.ccLoginClick}>LOGGA IN SOM KUND</button>
				<button className="btn">LOGGA IN SOM ADMIN</button>
				<button className="logOutBtn btn" onClick={this.logOut}>Logga ut</button>
			</div>
			break;
			case 'bookCar': return <div><BookCar/><button className="logOutBtn btn" onClick={this.logOut}>Logga ut</button></div>
			break;
		}
	}
	
	ccLoginClick(ev){
		this.setState({
			view: 'bookCar'
		});
	}
	
	logOut(ev){
		this.setState({
			view: 'Login'
		});
	}
}

export default Login;