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
		this.ccLoginClick = this.ccLoginClick.bind(this);
		this.logOut = this.logOut.bind(this);
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
		} else {
			logOutBox = <div>LOGUTBOXJÄVEL</div>
		}
		
		let navBar = <ul className="navBar">
					<li><span className={this.state.tabs[0].class} onClick={this.switchTab} id="tab1">Logga in</span></li>
					<li><span className={this.state.tabs[1].class} onClick={this.switchTab} id="tab2">Registrera</span></li>
				</ul>;
		switch (this.state.view){
<<<<<<< HEAD
			case 'Login': view =
				<div className="mainContent">
					{navBar}
					<LoginComponent updateView={this.updateView} updateUserId={this.updateUserId}/>
				</div>
=======
			case 'Login': view = <div className="mainContent">
						{navBar}
						<LoginComponent updateView={this.updateView} updateUserId={this.updateUserId} updateUserInfo={this.updateUserInfo}/>
					</div>
>>>>>>> 5d79e51a1d4d6f602e23bdacb509143fa81c42a0
				break;
			case 'registerNewCC': view = <div className="mainContent">
			{navBar}
					<RegisterComponent updateView={this.updateView}/>
				</div>
			break;
<<<<<<< HEAD
			case 'UserView': view = <div className="mainContent"><UserView userId={this.state.userId}/></div>
			break;
			case 'AdminView': view = <div className="mainContent"><AdminView /></div>
=======

			case 'UserView': view = <div>{logOutBox}<div className="mainContent"><UserView userId={this.state.userId}/></div></div>
			break;
			case 'AdminView': view = <div className="mainContent"><AdminView/></div>

>>>>>>> 5d79e51a1d4d6f602e23bdacb509143fa81c42a0
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
		console.log(ev.target.id);
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

	updateView(str){
		this.setState({
			view: str
		});
	}

	updateUserId(str){
		this.setState({
			userId: str
		});
	}
	
	logOutClick(ev){
		this.setState({
			view: 'Login'
		});
	}
	
	updateUserInfo(user) {
		this.setState({
			loggedInAs: user
		})
	}
}

export default ViewSelector;


/*

				<div className="btnBox">
				<button className="btn" onClick={this.ccLoginClick}>LOGGA IN SOM KUND</button>
				<button className="btn">LOGGA IN SOM ADMIN</button>
				<button className="logOutBtn btn" onClick={this.logOut}>Logga ut</button>
			</div>

			<button className="logOutBtn btn" onClick={this.logOut}>Logga ut</button>*/
