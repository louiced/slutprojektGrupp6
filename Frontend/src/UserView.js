import React from 'react';
import './App.css';
import BookCar from './BookCar.js';
import ShowBookings from './ShowBookings.js';


class UserView extends React.Component {
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
			view: 'bookCar'
		};
		this.switchTab = this.switchTab.bind(this);
	}
	render(){
		let view;
		let navBar = <ul className="navBar">
					<li><span className={this.state.tabs[0].class} onClick={this.switchTab} id="tab1">Boka bil</span></li>
					<li><span className={this.state.tabs[1].class} onClick={this.switchTab} id="tab2">Mina bokningar</span></li>
				</ul>
		switch (this.state.view){
			case 'bookCar': view = <div>{navBar}<BookCar/></div>
				break;
			case 'showBookings': view = <div>{navBar}<ShowBookings/></div>
				break;
			}
		return view;
	}
	
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
		id === 'tab1' ? view = 'bookCar' : view = 'showBookings';
		this.setState({
			tabs: newTabs,
			view: view
		});
	}
}

export default UserView;