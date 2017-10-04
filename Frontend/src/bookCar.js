import React from 'react';
import './App.css';


class BookCar extends React.Component {
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
			case 'bookCar': view = <div className="mainContent">
			{navBar}
			<h2>Boka en bil</h2>
			<h4>Välj datum</h4>
		<form>
			<input type="date" name="bookDate" min="2017-10-02"/>
		</form>
			<form>
			<input type="date" name="bookDate" min="2017-10-02"/>
		</form>
			<h4>Filtrera din sökning</h4>
			<div className="filterBox">
				<span>Automat/manuell <select name="auto/man">
					<option value="automatic">Automatisk</option>
					<option value="manual" defaultValue>Manuell</option>
				</select>
					</span>
				<span>Körkortstyp <select name="driveLic">
					<option value="A" defaultValue>A</option>
					<option value="B">B</option>
				</select>
					</span> 
				<span>Bränsle <select name="fuel">
					<option value="Diesel" defaultValue>Diesel</option>
					<option value="Gasoline">Bensin</option>
					<option value="Electricity">El</option>
				</select>
					</span>
				<span>Maxhyra 
				<input type="number" name="quantity" min="0" max="5000" value="5000"/>
				</span>
			</div>
			<button className="btn" onClick={this.findCars} >Hitta bilar</button>
		</div>
				break;
			case 'showBookings': view = <div className="mainContent">
					{navBar}
					<h2>Mina bokningar</h2></div>
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
	
	findCars(ev){
		
	}
}

export default BookCar;