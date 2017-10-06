import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import UserView from './UserView.js';

class LoginComponent extends React.Component {
	constructor(props){
		super(props);
		this.state={
			email: '',
			pw: '',
			view: 'Login'
		};
		this.handleEmailInput = this.handleEmailInput.bind(this);
		this.handlePwInput = this.handlePwInput.bind(this);
		this.loginClick = this.loginClick.bind(this);
	}
	render(){
		let view;
		switch(this.state.view){
			case 'Login':
				view = <div>
			<input type="text" placeholder="Epost" onChange={this.handleEmailInput}/>
			<input type="password" placeholder="Lösenord" onChange={this.handlePwInput}/>
			<button className="btn" onClick={this.loginClick}>LOGGA IN</button>
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

	loginClick(ev){
		// Make login automatically
		/*
		this.setState({
			view: 'UserView'
		});
		*/

		 // TO DO

		/*
		axios.get('http://localhost/olsson/users')
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		})
		*/

		this.props.updateView('UserView');
		/*
		fetch( 'http://localhost:4000/vehicles' )
           .then(resp => resp.json())
           .then(json => {
               console.log("API response:", json);

           })
           .catch(error => {
               console.warn("API error:", error);
           });
		   */
	}
}

export default LoginComponent;
