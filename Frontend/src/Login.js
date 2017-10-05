import React, { Component } from 'react';
import './App.css';
import BookCar from './bookCar.js';
import LoginComponent from './LoginComponent.js';
import RegisterComponent from './RegisterComponent.js';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tabs: [
				{
					class: 'active',
					id: 'tab1'
				},
				{
					class: '',
					id: 'tab2'
				}
			],
			view: 'Login'
		}
		this.ccLoginClick = this.ccLoginClick.bind(this);
		this.logOut = this.logOut.bind(this);
		this.switchTab = this.switchTab.bind(this);
	}
	render(){
		let view;
		let navBar = <ul className="navBar">
					<li><span className={this.state.tabs[0].class} onClick={this.switchTab} id="tab1">Logga in</span></li>
					<li><span className={this.state.tabs[1].class} onClick={this.switchTab} id="tab2">Registrera</span></li>
				</ul>;
		switch (this.state.view){
			case 'Login': view = 
				<div className="mainContent">
					<LoginComponent navBar={navBar}/>
				</div>
				break;
			case 'registerNewCC': view = <div className="mainContent">
			
					<RegisterComponent navBar={navBar}/>
				</div>
			break;
		}
		return view;
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
	switchTab(ev){
		let id = ev.target.value;
		let newTabs = [];
		let view;
		this.state.tabs.forEach(el => {
			el.id === id ? newTabs.push({
				class: 'active',
				id: el.id
			}) : newTabs.push({
				class: '',
				id: el.id
			});
		});
		id === 'tab1' ? view = 'Login' : view = 'registerNewCC';
		this.setState({
			tabs: newTabs,
			view: view
		});
	}
}

export default Login;


/*
				
				<div className="btnBox">
				<button className="btn" onClick={this.ccLoginClick}>LOGGA IN SOM KUND</button>
				<button className="btn">LOGGA IN SOM ADMIN</button>
				<button className="logOutBtn btn" onClick={this.logOut}>Logga ut</button>
			</div>
			
			<button className="logOutBtn btn" onClick={this.logOut}>Logga ut</button>*/