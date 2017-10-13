import React, { Component } from 'react';
import './App.css';
import BookCar from './BookCar.js';
import LoginComponent from './LoginComponent.js';
import RegisterComponent from './RegisterComponent.js';
import UserView from './UserView.js';
import AdminView from './AdminView.js';

class ViewSelector extends React.Component{
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
			view: 'Login',
			loggedInAs: null
		}
		this.switchTab = this.switchTab.bind(this);
		this.updateView = this.updateView.bind(this);
		this.updateUserId = this.updateUserId.bind(this);
		this.logOutClick = this.logOutClick.bind(this);
		this.updateUserInfo = this.updateUserInfo.bind(this);
	}
	render(){
		let view;
		let logOutBox;
		if (this.state.loggedInAs !== null){
			logOutBox = <div className="userInfo">
				<button className="btn" onClick={this.logOutClick}>LOGGA UT</button>
				<p>Inloggad som {this.state.loggedInAs.name.first} {this.state.loggedInAs.name.last}</p>
			</div>
		} 

		let navBar = <ul className="navBar">
					<li><span className={this.state.tabs[0].class} onClick={this.switchTab} id="tab1">Logga in</span></li>
					<li><span className={this.state.tabs[1].class} onClick={this.switchTab} id="tab2">Registrera</span></li>
				</ul>;
		switch (this.state.view){
			case 'Login': view = <div className="mainContent">
						{navBar}
						<LoginComponent updateView={this.updateView} updateUserId={this.updateUserId} updateUserInfo={this.updateUserInfo}/>
					</div>
				break;
			case 'registerNewCC': view = <div className="mainContent">
			{navBar}
					<RegisterComponent updateView={this.updateView} updateUserId={this.updateUserId} updateUserInfo={this.updateUserInfo}/>
				</div>
			break;

			case 'UserView': view = <div className="mainContent">{logOutBox}<UserView userId={this.state.userId}/></div>
			break;
			case 'AdminView': view = <div className="mainContent">{logOutBox}<AdminView userId={this.state.userId}/></div>


		}
		return view;
	}

	// Switch between login and register tabs
	switchTab(ev){
		let id = ev.target.id;
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

	// Updates view
	updateView(str){
		this.setState({
			view: str
		});
	}

	// Updates userId in state for other components to use
	updateUserId(str){
		this.setState({
			userId: str
		});
	}

	// Logs user out
	logOutClick(ev){
		localStorage.removeItem('userEmail');
		localStorage.removeItem('userPw');
		this.setState({
			view: 'Login'
		});
	}

	// Updates state with complete user object
	updateUserInfo(user) {
		this.setState({
			loggedInAs: user
		})
	}
}

export default ViewSelector;