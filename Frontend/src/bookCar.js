import React from 'react';
import './App.css';
import axios from 'axios';
import ListCars from './ListCars.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


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
			availableCars: {},
			pickupDate: moment(),
			returnDate: moment(),
			maxRentFilter: 5000,
			fuelFilter: undefined,
			driveLicFilter: undefined,
			gearFilter: undefined
		};
		this.renderCars = this.renderCars.bind(this);
		this.findCars = this.findCars.bind(this);
		this.handleReturnDate = this.handleReturnDate.bind(this);
		this.handlePickupDate = this.handlePickupDate.bind(this);
		this.handleGearChange = this.handleGearChange.bind(this);
		this.handleDriveLicChange = this.handleDriveLicChange.bind(this);
		this.handleFuelChange = this.handleFuelChange.bind(this);
		this.handleMaxRentChange = this.handleMaxRentChange.bind(this);
		this.updateView = this.updateView.bind(this);
	}
	render(){
		let view;
		switch(this.state.view){
			case 'bookCar': view = <div>
			<h2>Boka en bil</h2>
			<h4>Välj datum</h4>
				<span>Jag vill hyra en bil från: </span><DatePicker dateFormat="YYYY/MM/DD" selected={this.state.pickupDate} onChange={this.handlePickupDate}/>
				<span>Till och med: </span><DatePicker dateFormat="YYYY/MM/DD" selected={this.state.returnDate} onChange={this.handleReturnDate}/>
			<h4>Filtrera din sökning</h4>
			<div className="filterBox">
				<span>Automat/manuell: <select name="auto/man" onChange={this.handleGearChange}>
					<option value="" defaultValue></option>
					<option value="automat">Automatisk</option>
					<option value="manuell">Manuell</option>
				</select>
					</span>
				<span>Körkortstyp: <select name="driveLic" onChange={this.handleDriveLicChange}>
					<option value="" defaultValue></option>
					<option value="A" >A</option>
					<option value="B">B</option>
				</select>
					</span>
				<span>Bränsle: <select name="fuel" onChange={this.handleFuelChange}>
					<option value="" defaultValue></option>
					<option value="95" >Bensin 95</option>
					<option value="diesel">Diesel</option>
				</select>
					</span>
				<span>Maxhyra per dag: <input type="number" name="quantity" min="0" max="5000" defaultValue="5000" onChange={this.handleMaxRentChange}/>
				</span>
			</div>
			<button className="btn" onClick={this.findCars} >Hitta bilar</button>
		</div>
				break;
			case 'listCars': view = <ListCars data={this.state.availableCars} unavailableCars={this.state.unAvailableCars} userId={this.props.userId} pickupDate={this.state.pickupDate} returnDate={this.state.returnDate} bookCar={this.updateView} showBookings={this.props.showBookings}/>
				break;
			default: view = <div>Default</div>
							  }
		return view;
	}
	
	
	// Gets all vehicles from DB
	findCars(ev){
		let self = this;
		axios.get('/vehicles')
		.then(res => {
			self.filterCars(res.data);
		})
		.catch(err => {
			console.log(err);
		})
	}
	
	
	// Filters vehicles depending on users choices
	filterCars(data){
		let availableCars = [];
		let unAvailableCars = [];
		let myPickupDate = this.state.pickupDate.valueOf();
		let myReturnDate = this.state.returnDate.valueOf();
		
		// Filter 
		for (let o in data){
			let obj = data[o];
			
			if(obj.gearbox === this.state.gearFilter || this.state.gearFilter === undefined){
				if(obj.fuel === this.state.fuelFilter || this.state.fuelFilter === undefined){
					if(obj.dailyFee <= this.state.maxRentFilter){
						if(obj.requiredDriversLicense === this.state.driveLicFilter || this.state.driveLicFilter === undefined){
							let avail = false;
							if(!obj.bookings.length > 0){
								avail = true;
							}
							obj.bookings.forEach(booking => {
								if (myPickupDate < booking.pickupDate && myReturnDate < booking.pickupDate){
									avail = true;
								} else if (myPickupDate > (booking.returnDate + 43200000) && myReturnDate > (booking.returnDate + 43200000)){
									avail = true;
								} else {
									avail = false;
								}
							})
							if (avail){
								availableCars.push(obj);
							} else {
								unAvailableCars.push(obj);
							}
						}
					}
				}
			}
		}
		this.renderCars(availableCars, unAvailableCars);
	}
	
	
	// Updates state and renders available and unavailable cars
	renderCars(availableCars, unAvailableCars){
		this.setState({
			availableCars,
			unAvailableCars,
			view: 'listCars'
		});
	}
	
	// Updates state with new view and new "now"-moment
	updateView(str){
		this.setState({
			view: str,
			pickupDate: moment(),
			returnDate: moment()
		});
	}

	
	// Event handlers
	handlePickupDate(date){
		this.setState({
			pickupDate: date,
			returnDate: date
		});
	}

	handleReturnDate(date){
		this.setState({
			returnDate: date
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
	handleDateChange(date) {
		this.setState({
			startDate: date
		});
	}
}


export default BookCar;



