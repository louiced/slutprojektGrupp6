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
			view: 'Login',
            isLoggedIn: false
		};
		this.handleEmailInput = this.handleEmailInput.bind(this);
		this.handlePwInput = this.handlePwInput.bind(this);
		this.loginClick = this.loginClick.bind(this);
		this.updateLoginStatus = this.updateLoginStatus.bind(this);
		this.validateLogin = this.validateLogin.bind(this);
	}
	render(){
      //console.log('uv', this.props.updateView());
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
    
    log(){
      console.log('log');
    }
    
    updateLoginStatus(){
      console.log('updateLoginStatus: ', this.state.isLoggedIn);
      this.setState({
        isLoggedIn: true
      })
    }
    
    validateLogin(){
      console.log('validate: ', this.state.isLoggedIn);
      if(this.state.isLoggedIn === true) {
        this.props.updateView('UserView');
      }
    }
  
	loginClick(ev){
      let self = this;
      console.log('self.isLoggedIn i loginclick: ', self.state.isLoggedIn)
      
      axios.get('http://localhost:3000/users')
      .then(function (response) {
        console.log('response.data: ', response.data);
        
        //self.setState({isLoggedIn: true});
        //console.log('isLoggedIn then', self.state.isLoggedIn);
        //console.log('self: ', self);
        //self.log();
        
        self.updateLoginStatus();
        self.validateLogin();
      })
      .catch(function (error) {
        console.log(error);
      });
      
      /*console.log('isLoggedIn före if', self.state.isLoggedIn);
      if(self.state.isLoggedIn)
          console.log('isLoggedIn efter if', self.state.isLoggedIn);
          self.props.updateView('UserView');*/
	}
}

export default LoginComponent;
