import React from 'react';
import './App.css';
import axios from 'axios';
import ListCars from './ListCars.js';


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
			view: 'bookCar',
			data: {},
			pickupDate: '',
			returnDate: ''
		};
		this.renderCars = this.renderCars.bind(this);
		this.findCars = this.findCars.bind(this);
		this.handleReturnDate = this.handleReturnDate.bind(this);
		this.handlePickupDate = this.handlePickupDate.bind(this);
	}
	render(){
		console.log(this.state);
		let view;
		switch(this.state.view){
			case 'bookCar': view = <div>
			<h2>Boka en bil</h2>
			<h4>Välj datum</h4>
		<form>
			<span>Boka från: </span><input type="date" name="bookDate" min={new Date()} onChange={this.handlePickupDate}/>
		</form>
			<form>
			<span>Till och med:  </span><input type="date" name="bookDate" min={new Date()} onChange={this.handleReturnDate}/>
		</form>
			<h4>Filtrera din sökning</h4>
			<div className="filterBox">
				<span>Automat/manuell <select name="auto/man" onChange={this.handleGearChange}>
					<option value="" defaultValue></option>
					<option value="automatic">Automatisk</option>
					<option value="manual">Manuell</option>
				</select>
					</span>
				<span>Körkortstyp <select name="driveLic" onChange={this.handleDriveLicChange}>
					<option value="" defaultValue></option>
					<option value="A" >A</option>
					<option value="B">B</option>
				</select>
					</span> 
				<span>Bränsle <select name="fuel" onChange={this.handleFuelChange}>
					<option value="" defaultValue></option>
					<option value="Diesel" >Diesel</option>
					<option value="Gasoline">Bensin</option>
					<option value="Electricity">El</option>
				</select>
					</span>
				<span>Maxhyra 
				<input type="number" name="quantity" min="0" max="5000" value="5000" onChange={this.handleMaxRentChange}/>
				</span>
			</div>
			<button className="btn" onClick={this.findCars} >Hitta bilar</button>
		</div>
				break;
			case 'showCars': view = <ListCars data={this.state.data}/>
				break;
			default: view = <div>Default</div>
							  }
		return view;
	}
	renderCars(data){
		this.setState({
			data,
			view: 'showCars'
		});
	}
	
	findCars(ev){
		let self = this;
		axios.get('http://localhost:3000/vehicles')
		.then(res => {
			//console.log(res);
			self.renderCars(res.data);
		})
		.catch(err => {
			console.log(err);
		})
		// Switch view: Render new component
	}
	
	handlePickupDate(ev){
		let pickupDate = ev.target.value;
		console.log(pickupDate);
		this.setState({
			pickupDate: pickupDate
		});
	}
	
	handleReturnDate(ev){
		let returnDate = ev.target.value;
		this.setState({
			returnDate: returnDate
		});
	}
	
	handleGearChange(ev){
		this.setState({
			gearFilter: ev.target.value
		});
	}
	
	handleDriveLicChange(ev){
		this.setState({
			driveLicFilter: ev.target.value
		});
	}
	
	handleFuelChange(ev){
		this.setState({
			fuelFilter: ev.target.value
		});
	}
	
	handleMaxRentChange(ev){
		this.setState({
			maxRentFilter: ev.target.value
		});
	}
	
}


/*
class ShowCarList {
	componentDidMount(){
		// Make GET request
		// Map list of cars
		// Filter?
	}
}
*/
export default BookCar;