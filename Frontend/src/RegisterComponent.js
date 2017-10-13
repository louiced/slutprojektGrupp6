import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import UserView from './UserView.js';
var querystring = require('querystring');

class RegisterComponent extends React.Component {
	constructor(props){
		super(props);
		this.state={
			view: 'Login',
			errMsg: null,
			errMsgCss: 'errMsgCss hidden',
			emailInputCss: '',
			ageInputCss: '',
			passwordInputCss: '',
			nameFirstInputCss: '',
			nameLastInputCss: '',
			driversLicenseInputCss: '',
      allUsers: []
		};
		this.handleEmailInput = this.handleEmailInput.bind(this);
		this.handlePwInput = this.handlePwInput.bind(this);
		this.registerClick = this.registerClick.bind(this);
		this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
		this.handleLastNameInput = this.handleLastNameInput.bind(this);
		this.handleAgeInput = this.handleAgeInput.bind(this);
		this.handleDrivLicInput = this.handleDrivLicInput.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.userExists = this.userExists.bind(this);
		this.renderThanks = this.renderThanks.bind(this);
	}
	render(){
		let view;
		switch(this.state.view){
			case 'Login':
				view = <div>
                  <input type="text" className={this.state.nameFirstInputCss} placeholder="Förnamn" onChange={this.handleFirstNameInput}/>
                  <input type="text" className={this.state.nameLastInputCss} placeholder="Efternamn" onChange={this.handleLastNameInput}/>
                  <input type="text" className={this.state.emailInputCss} placeholder="Epost" onChange={this.handleEmailInput}/>
                  <input type="password" className={this.state.passwordInputCss} placeholder="Lösenord" onChange={this.handlePwInput}/>
                  <input type="text" className={this.state.ageInputCss} placeholder="Ålder" onChange={this.handleAgeInput}/>
                  <input type="text" className={this.state.driversLicenseInputCss} placeholder="Körkort" onChange={this.handleDrivLicInput}/>
                  <br/>
				  <p className={this.state.errMsgCss}>{this.state.errMsg}</p>
                  <button className="btn" onClick={this.registerClick}>REGISTRERA</button>
		        </div>
                  break;
            case 'Thanks':
          		view = <div className="thanksForRegMsg">
					<h1>Tack för din registrering!</h1>
				</div>
				break;
		}
		return view;
	}
    componentDidMount() {
      let self = this;
      axios.get('http://localhost:3000/users')
      .then(function (response) {
        self.setState({
          allUsers: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
		getIdAndSend(mail){
			let self = this;
			axios.get('http://localhost:3000/users')
			.then(function (response) {
				let found = response.data.find( (obj) =>{
					return obj.email === mail
				});
				self.props.updateUserId(found._id);
				self.props.updateUserInfo(found);
			})
			.catch(function (error) {
				console.log(error);
			});
		}
		renderThanks() {
			this.setState({
				view: 'Thanks'
			})
			let self = this;
			setTimeout(function() {
				self.props.updateView('UserView');
			}, 3000);
		}
		validateInput(obj){
      for(let key in obj) {
        if(obj.hasOwnProperty('name')) {
			//kontrollera först om några fält lämnats tomma, isf return false
			if(obj.name.first === '' ||
             obj.name.last === '' ||
             obj.name.first === undefined ||
             obj.name.last === undefined ||
             obj.email === '' ||
             obj.email === undefined ||
             obj.password === '' ||
             obj.password === undefined ||
             obj.age === '' ||
             obj.age === undefined ||
             obj.driversLicense === '' ||
             obj.driversLicense === undefined) {
				
				this.setState({
					 errMsg: 'Inga fält får lämnas tomma.',
					 errMsgCss: 'errMsgCss'
				 });
				 return false;
			 } else {
				 //felaktigt format email returns false:
				 if(obj.email.indexOf('@') === -1) {
					 this.setState({
						 errMsg: 'felaktig emailadress',
						 errMsgCss: 'errMsgCss',
						 emailInputCss: 'attention'
					 });
					 console.log('felaktig emailadress');
					 return false;
				 } else {
					 this.setState({
						 emailInputCss: ''
					 })
				 }
				 //felaktigt format age returns false:
				 if(isNaN(obj.age)) {
					 console.log('ålder måste vara en siffra');
					 this.setState({
						 errMsg: 'Ålder måste vara en siffra',
						 errMsgCss: 'errMsgCss',
						 ageInputCss: 'attention'
					 });
					 return false;
				 } else {
					 this.setState({
						 ageInputCss: '',
					 })
				 }


				 if(typeof(obj.name.first)!== 'string') {
					 this.setState({
						 errMsg: 'Namn får bara vara bokstäver',
						 errMsgCss: 'errMsgCss',
						 nameInputCss: 'attention'
					 });
					 return false;
				 } else {
					 this.setState({
						 nameFirstInputCss: '',
					 })
				 }
				 if(typeof(obj.name.last)!== 'string') {
					 this.setState({
						 errMsg: 'Namn får bara vara bokstäver',
						 errMsgCss: 'errMsgCss',
						 nameInputCss: 'attention'
					 });
					 return false;
				 } else {
					 this.setState({
						 nameLastInputCss: '',
					 })
				 }
				 if(typeof(obj.driversLicense)!== 'string') {
					 this.setState({
						 errMsg: 'Körkort får bara ha bokstäver eller siffror',
						 errMsgCss: 'errMsgCss',
						 nameInputCss: 'attention'
					 });
					 return false;
				 } else {
					 this.setState({
						 driversLicenseInputCss: '',
					 })
				 }
				 console.log('returning true for validation');
				 return true;
			 }
		 }
	 }
}
    userExists() {
      //jmf state.email och response.email
      let exists = this.state.allUsers.find( (el) => {
        return el.email === this.state.email;
      });
      if(exists === undefined) {
        return false;
      } else {
        return true;
      }
    }
    post(obj) {
      axios({
          method: 'post',
          url: 'http://localhost:3000/users',
          data: obj
        });
    }
	handleEmailInput(ev){
		let val = ev.target.value;
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
      let obj = {
        name: {
          first: this.state.firstName,
          last: this.state.lastName,
        },
        email:  this.state.email,
        password: String(this.state.pw),
        age: Number(this.state.age),
        driversLicense: this.state.driversLicense
      }

			let validated = this.validateInput(obj); //kontrollera att obj har giltiga värden, isf return true
			if(validated === true) { //om allt stämmer, kontrollera om anv redan finns, om inte: gör en post, gå till UserView
				let ifExists = this.userExists();
				if(ifExists === false) {
					this.post(obj);
					this.renderThanks(); //visa tack för registrering, visar sen UserView
					this.getIdAndSend(obj.email);
				} else {
					//om anv finns, exists===true, stanna på registerNewCC
					this.setState({
						 errMsg: 'Användaren existerar redan, gå till logga in eller välj en annan email.',
						 errMsgCss: 'errMsgCss',
					 });
					console.log('post did not succeed, user already exists');
					this.props.updateView('registerNewCC');
				}
			} else {
				console.log('post did not succeed, validation error');
				this.props.updateView('registerNewCC');
			}
	}
}
export default RegisterComponent;
