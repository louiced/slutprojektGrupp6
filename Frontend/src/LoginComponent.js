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
            isLoggedIn: false,
            loggedInAs: null,
			errMsg: null,
			errMsgCss: 'errMsgCss hidden'
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
			<p className={this.state.errMsgCss}>{this.state.errMsg}</p>
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
		console.log(val);
		this.setState({
			pw: val
		});
	}
    
    
    //uppdaterar state så att loggedIn = true OM user matchar user i db
    updateLoginStatus(response){
      let allUsers = response.data;
      allUsers.forEach( (el) => {
        if(this.state.email === el.email && this.state.pw === el.password)
          this.setState({
            isLoggedIn: true,
            loggedInAs: el
          })
      });
    }
    
    //admin ? AdminView : UserView
    validateLogin(){
      console.log('validate isLoggedIn: ', this.state.isLoggedIn); //if false, render errMsg!
      console.log('validate, loggedInAs: ', this.state.loggedInAs); //bör returnera EN user som matchar det som matats in, annars default null
      
      if(this.state.isLoggedIn === true) {
        if(this.state.email !== 'admin@olsson.se') {
          this.props.updateView('UserView');
        } else {
        console.log('adminview');
        //this.props.updateView('AdminView');
        }
      } else if (this.state.isLoggedIn === false || this.state.loggedInAs === null) { //render errMsg
		  this.setState({
			  errMsg: 'Epost och lösenord mastchade inget i databasen. Försök igen!',
			  errMsgCss: 'errMsgCss'
		  })
	  }
    }
  
	loginClick(ev){
      let self = this;      
      axios.get('http://localhost:3000/users')
      .then(function (response) {
        console.log(response);
        self.updateLoginStatus(response); //finns user/admin i db? -> loggedIn = true, annars oops and retry!
        self.validateLogin();             //loggedInAs admin/user? -> render UserView/AdminView
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }
}

export default LoginComponent;
