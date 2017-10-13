import React from 'react';
import './App.css';
import axios from 'axios';

class ShowBookings extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			bookedCars: [],
			carBookings: [],
			currentId: '',
			view: 'ShowBookings',
			currentDateString: ''
		};
		this.anullBooking = this.anullBooking.bind(this);
		this.renderCars = this.renderCars.bind(this);
		this.renderVehicles = this.renderVehicles.bind(this);
		this.confirmAnullment = this.confirmAnullment.bind(this);
		this.noAnullment = this.noAnullment.bind(this);
	}
	render(){
		let view;
		switch(this.state.view){
			case 'ShowBookings':
				if (this.state.bookedCars.length > 0){ //
			let key = 0;
				let carList = this.state.bookedCars.map(car => {
				return <div className="carBox row" key={key++}>
					<div>
						<img className="carImg" src={car.carObj.imgLink} alt="#"/>
					</div>
					<div className="carInfo">
						<span style={{fontWeight: 'bold'}}>{car.carObj.brand}</span><span> {car.carObj.model}</span>
						<p style={{fontWeight: 'bold'}}>Hämtas </p><p> {new Date(Number(car.pickupDate)).toLocaleDateString()}</p>
						<p style={{fontWeight: 'bold'}}>Lämnas tillbaka </p><p> {new Date(Number(car.returnDate)).toLocaleDateString()}</p>
						
					</div>
					<div>
						<button data-id={car.carObj._id} onClick={this.anullBooking} className="btn">Avboka</button>
					</div>
				</div>
			})
			view = <div>
				<h2>Mina bokningar</h2>
				<ul>{carList}</ul>
			</div>
		} else {
			view = <div><h2>Mina bokningar</h2>
				<p>Inga bokningar för närvarande</p><br/></div>
		}
				break;
			case 'ConfirmAnull': 
				view = <div>
					<p>Är du säker på att du vill avboka den här bilen?</p>
						<button className="btn" onClick={this.anullBooking} data-id={this.state.currentId} data-datestring={this.state.currentDateString}>Ja</button>
						<button className="btn" onClick={this.noAnullment}>Nej</button>
					</div>
					break;
			case 'AnullmentConfirm': 
				view = <div><p>Avbokningen är bekräftad</p></div>

		}
		return view;
	}

	// Gets previous bookings for loggedin user and gets vehicleDocument
	componentDidMount(){
		let self = this;
		axios.get(`http://localhost:3000/users/${this.props.userId}`)
		.then(res => {
			self.renderCars(res.data.bookedCars);
		})
		.catch(err => {
			console.log(err);
		})
		
		axios.get(`http://localhost:3000/vehicles`)
		.then(res => {
			self.renderVehicles(res.data);
		})
		.catch(err => {
			console.log(err);
		})
	}

	// Renders list of users booked cars
	renderCars(data){
		this.setState({
			bookedCars: data
		});
	}

	// Saves carbookings to state
	renderVehicles(data){
		this.setState({
			carBookings: data
		});
	}

	// Performs an anullment of choosen booking
	anullBooking(ev){
		let carId = ev.target.getAttribute('data-id');
		let dateString = ev.target.getAttribute('data-datestring');
		let newBookedCars = [];
		let newBookingsForCar = [];
		
		// Finds clicked booking
		this.state.bookedCars.forEach(car => {
			if (car.dateString !== dateString){
				newBookedCars.push(car);
			}
		});

		let pickedCar = this.state.carBookings.find(car => {
			return car._id === carId
		});
		
		let newBookingsForCarDoc = pickedCar.bookings.filter(book => {
			return book.dateString !== dateString
		})
		this.updateUserDocument(newBookedCars);
		this.updateVehicleDocument(newBookingsForCarDoc, carId);
		
		// Updates state and confirms that anullment has been made
		this.setState({
			bookedCars: newBookedCars,
			view: 'AnullmentConfirm'
		});
		
		// Goes back to MyBooking, 3s
		setTimeout( () => {
			this.setState({
				view: 'ShowBookings'
			});
		}, 3000);
	}
	
	// Put to DB, User
	updateUserDocument(data){
		axios({
			method: 'put',
			url: `http://localhost:3000/users/${this.props.userId}`,
			data: {
				bookedCars: data
			}
		});

	}
	
	
	// Put to DB, Vehicle
	updateVehicleDocument(data, id){
		axios({
			method: 'put',
			url: `http://localhost:3000/vehicles/${id}`,
			data: {
				bookings: data
			}
		});
	}
	
	// Asks user to confirm anullment
	confirmAnullment(ev){
		this.setState({
			view: 'ConfirmAnull',
			currentId: ev.target.getAttribute('data-id'),
			currentDateString: ev.target.getAttribute('data-datestring')
		});
	}
	
	// User chooses NOT to proceed
	noAnullment(){
		this.setState({
			view: 'ShowBookings'
		});
	}
}

export default ShowBookings;
