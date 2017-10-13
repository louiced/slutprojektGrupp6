import React from 'react';
import './App.css';
import axios from 'axios';

class ListCars extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			bookedCars: [],
			view: "ListCars"
		};
		this.bookCarClick = this.bookCarClick.bind(this);
		this.updateUserDocument = this.updateUserDocument.bind(this);
		this.updateStateCars = this.updateStateCars.bind(this);
		this.confirmBooking = this.confirmBooking.bind(this);
		this.noBooking = this.noBooking.bind(this);
		this.bookMoreCars = this.bookMoreCars.bind(this);
		this.showBookings = this.showBookings.bind(this);
	}
	render(){
		let view;
		if (this.state.view === 'ListCars'){
			if (this.props.data.length > 0 && this.props.unavailableCars.length > 0){
				let list = this.props.data.map(el => {
				return <div className="carBox row" key={el._id}>
					<div>
						<img className="carImg" src={el.imgLink} alt="#"/>
					</div>
					<div className="carInfo">
						<h4>{el.brand} - {el.model}</h4>
						<p>Fordonstyp: {el.vehicleType}</p>
						<p>Årsmodell: {el.year}</p>
						<p>Växellåda: {el.gearbox}</p>
						<p>Bränsle: {el.fuel}</p>
						<p>Körkort: {el.requiredDriversLicense}</p>
						<p>Hyra: {el.dailyFee} per dygn</p>
					</div>
					<div data-id={el._id}>
						<button className="btn" onClick={this.confirmBooking}>Boka</button>
					</div>
				</div>
				})
				let unavList = this.props.unavailableCars.map(el => {
				return <div className="carBox row" key={el._id} data-id={el._id}>
					<div>
						<img className="carImg" src={el.imgLink} alt="#"/>
					</div>
					<div className="carInfo">
						<h4>{el.brand} - {el.model}</h4>
						<p>Fordonstyp: {el.vehicleType}</p>
						<p>Årsmodell: {el.year}</p>
						<p>Växellåda: {el.gearbox}</p>
						<p>Bränsle: {el.fuel}</p>
						<p>Körkort: {el.requiredDriversLicense}</p>
						<p>Hyra: {el.dailyFee} per dygn</p>
					</div>
					<div>
						<button className="btn unav" disabled>Ej tillgänglig</button>
					</div>
				</div>
				})
				view = <div>
						<ul>{list}</ul>
						<ul>{unavList}</ul>
					</div>
			} else if(this.props.data.length > 0 && this.props.unavailableCars.length <= 0){
				let list = this.props.data.map(el => {
				return <div className="carBox row" key={el._id}>
					<div>
						<img className="carImg" src={el.imgLink} alt="#"/>
					</div>
					<div className="carInfo">
						<h4>{el.brand} - {el.model}</h4>
						<p>Fordonstyp: {el.vehicleType}</p>
						<p>Årsmodell: {el.year}</p>
						<p>Växellåda: {el.gearbox}</p>
						<p>Bränsle: {el.fuel}</p>
						<p>Körkort: {el.requiredDriversLicense}</p>
						<p>Hyra: {el.dailyFee} per dygn</p>
						
					</div>
					<div data-id={el._id}>
						<button className="btn" onClick={this.confirmBooking}>Boka</button>
					</div>
				</div>
				})
				view = <ul>{list}</ul>
			}
		} else if (this.state.view === 'ConfirmBooking'){
			view = <div>
					<p>Är du säker på att du vill boka den här bilen?</p>
					<button className="btn" onClick={this.bookCarClick} data-id={this.state.currentId}>Ja</button>
					<button className="btn" onClick={this.noBooking}>Nej</button>
				</div>
		} else if (this.state.view === 'Thanks'){
			view = <div>
					<p>Tack för din bokning!</p>
					<button className="btn" onClick={this.bookMoreCars}>Gör fler bokningar</button>
					<button className="btn" onClick={this.showBookings}>Visa mina bokningar</button>
				</div>
		}

		return <div>{view}</div>


	}

	componentDidMount(){

		// Gets previous booked cars of loggedIn user
		console.log(this.props.userId);
		let self = this;
		axios.get(`http://localhost:3000/users/${this.props.userId}`)
		.then(res => {
			console.log(res.data);
			self.updateStateCars(res.data.bookedCars); //List of booked cars for user
		})
		.catch(err => {
			console.log(err);
		})
	}

	// When user confirms booking
	bookCarClick(ev){

		let id = ev.target.getAttribute('data-id');
		let obj;
		let pickupString = this.props.pickupDate.toLocaleString();
		let returnString = this.props.returnDate.toLocaleString();
		let dateString = `${pickupString} - ${returnString}`;
		
		// Find clicked car and build object
		this.props.data.forEach(data => {
			if (data._id === id){
				obj = {
					carObj: data,
					pickupDate: this.props.pickupDate.valueOf(),
					returnDate: this.props.returnDate.valueOf(),
					dateString: dateString
				};
				this.updateUserDocument(obj);
			}
		})
		//new Date(1222333).valueOf return number so can compare, new Date(12232323).toLocaleString() can not compare date
		let self = this;
		axios.get(`http://localhost:3000/vehicles/${id}`)
		.then(res => {
			console.log(res.data);
			self.updateStateBookings(res.data.bookings, id);
		})
		.catch(err => {
			console.log(err);
		})
	}

	// Updates state with previous bookings of specific (clicked) car
	updateStateBookings(list, id){
		this.setState({
			previousCarBookings: list
		});
		this.updateVehicleDocument(id);
	}

	// Updates state with previous bookings for specific user
	updateStateCars(list){
		this.setState({
			bookedCars: list
		});
	}

	// Updates userDB with previous bookings AND new booking
	updateUserDocument(data) {
		let bookedCars = this.state.bookedCars;
		bookedCars.push(data);
		axios({
			method: 'put',
			url: `http://localhost:3000/users/${this.props.userId}`,
			data: {
				bookedCars: bookedCars
			}
		});
	}

	// Updates VehicleDB with previous bookings AND new booking
	updateVehicleDocument(id){
		let list = this.state.previousCarBookings;
		let pickupString = this.props.pickupDate.toLocaleString();
		let returnString = this.props.returnDate.toLocaleString();
		let dateString = `${pickupString} - ${returnString}`;
		let obj = {
			pickupDate: this.props.pickupDate.valueOf(),
			returnDate: this.props.returnDate.valueOf(),
			dateString: dateString
		};
		list.push(obj);
		
		// Put to DB
		axios({
			method: 'put',
			url: `http://localhost:3000/vehicles/${id}`,
			data: {
				bookings:  list
			}
		});

		// Render thanks-view
		this.setState({
			view: 'Thanks'
		});
	}

	// Asks user to confirm booking
	confirmBooking(ev){
		let id = ev.target.parentElement.getAttribute('data-id');
		this.setState({
			view: 'ConfirmBooking',
			currentId: id
		});
	}

	// User chooses NOT to book car
	noBooking(ev){
		this.setState({
			view: 'ListCars'
		});
	}

	// Renders new search-for-car page
	bookMoreCars(ev){
		this.props.bookCar('bookCar');
	}

	// Renders MyBookings
	showBookings(ev){
		this.props.showBookings();
	}
}


export default ListCars;
