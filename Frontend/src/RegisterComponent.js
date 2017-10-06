import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import UserView from './UserView.js';
var querystring = require('querystring');

class RegisterComponent extends React.Component {
	constructor(props){
		super(props);
		this.state={
			email: '',
			pw: '',
			view: 'Login'
		};
		this.handleEmailInput = this.handleEmailInput.bind(this);
		this.handlePwInput = this.handlePwInput.bind(this);
		this.registerClick = this.registerClick.bind(this);
		this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
		this.handleLastNameInput = this.handleLastNameInput.bind(this);
		this.handlePersonalNumberInput = this.handlePersonalNumberInput.bind(this);
		this.handleDrivLicInput = this.handleDrivLicInput.bind(this);
	}
	render(){
		let view;
		switch(this.state.view){
			case 'Login':
				view = <div>
			<input type="text" placeholder="Epost" onChange={this.handleEmailInput}/>
			<input type="password" placeholder="Lösenord" onChange={this.handlePwInput}/>
			<input type="text" placeholder="Förnamn" onChange={this.handleFirstNameInput}/>
			<input type="text" placeholder="Efternamn" onChange={this.handleLastNameInput}/>
			<input type="text" placeholder="åååå-mm-dd-xxxx" onChange={this.handlePersonalNumberInput}/>
			<input type="text" placeholder="Körkort" onChange={this.handleDrivLicInput}/>
						<br/>
			<button className="btn"  onClick={this.registerClick}>REGISTRERA</button>
		</div>
				break;
			case 'UserView': view = <UserView/>
							  }
		return view;
	}

	handleEmailInput(ev){
		let val = ev.target.value;
		console.log(val);
		this.setState({
			email: val
		});
	}

	handlePwInput(ev){
		let val = ev.target.value;
		this.setState({
			pw: val
		});
	}

	handleFirstNameInput(ev){
		let val = ev.target.value;
		this.setState({
			firstName: val
		});
	}

	handleLastNameInput(ev){
		let val = ev.target.value;
		this.setState({
			lastName: val
		});
	}

	handlePersonalNumberInput(ev){
		let val = ev.target.value;
		this.setState({
			personalNumber: val
		});
	}

	handleDrivLicInput(ev){
		let val = ev.target.value;
		this.setState({
			driveLicense: val
		});
	}



	registerClick(ev){
		axios({
			method: 'post',
			url: 'http://localhost:3000/users',
			data: {
				name: {
			    first: 'yifei',
			    last: 'wang'
			  },
			  email:  'heosdf@icloud.com',
			  password: 'dsfsdf',
			  age: 34,
			  driversLicense: 'B',
			  cars: [{'tes': 'sdf'}]
			}
        });
	}

export default RegisterComponent;
