import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import UserView from './UserView.js';
var querystring = require('querystring');

class RegisterComponent extends React.Component {
	constructor(props){
		super(props);
		this.state={
			view: 'Login'
		};
		this.handleEmailInput = this.handleEmailInput.bind(this);
		this.handlePwInput = this.handlePwInput.bind(this);
		this.registerClick = this.registerClick.bind(this);
		this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
		this.handleLastNameInput = this.handleLastNameInput.bind(this);
		this.handleAgeInput = this.handleAgeInput.bind(this);
		this.handleDrivLicInput = this.handleDrivLicInput.bind(this);
	}
	render(){
		let view;
		switch(this.state.view){
			case 'Login':
				view = <div>
			<input type="text" placeholder="Förnamn" onChange={this.handleFirstNameInput}/>
			<input type="text" placeholder="Efternamn" onChange={this.handleLastNameInput}/>
            <input type="text" placeholder="Epost" onChange={this.handleEmailInput}/>
			<input type="password" placeholder="Lösenord" onChange={this.handlePwInput}/>
			<input type="text" placeholder="Ålder" onChange={this.handleAgeInput}/>
			<input type="text" placeholder="Körkort" onChange={this.handleDrivLicInput}/>
						<br/>
			<button className="btn" onClick={this.registerClick}>REGISTRERA</button>
		</div>
				break;
			case 'UserView': view = <UserView/>
							  }
		return view;
	}

    /*
    validering av input:
    - email: ska innehålla @, googla!
    - pw: pw.length >= ?
    - firstname: != ''
    - lastname: != ''
    - age typeof Number
    - driversLicense: array, varje element typeof String
    
    #throw err, visa felmeddelande?
    */
  
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

	handleAgeInput(ev){
		let val = ev.target.value;
		this.setState({
			age: val
		});
	}

	handleDrivLicInput(ev){
		let val = ev.target.value;
		this.setState({
			driversLicense: val
		});
	}



	registerClick(ev){
      //kontrollerar format för input
      
      console.log('state: ', this.state);
      console.log('age: ', this.state.age);
      console.log('typeof: ', typeof(this.state.age));
      console.log('mail', this.state.email);
      let obj = {
          name: {
            first: this.state.firstName,
            last: this.state.lastName,
          },
          email:  this.state.email,
          password: this.state.pw,
          age: Number(this.state.age),
          driversLicense: this.state.driversLicense
        }
      console.log('obj: ', obj);

		axios({
			method: 'post',
			url: 'http://localhost:3000/users',
			data: obj
        });
        //mellansteg: Tack för din registrering!
        this.props.updateView('UserView');
	}
}

export default RegisterComponent;
