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
		//console.log(this.state.bookedCars);
		switch(this.state.view){
			case 'ShowBookings':
				if (this.state.bookedCars.length > 0){ //
			       let key = 0;
			   	   let carList = this.state.bookedCars.map(car => {
					console.log('carObj ', car.carObj)
				return <div className="carBox row" key={key++}>
					<div>
						<img className="carImg" src={car.carObj.imgLink} alt="#"/>
					</div>
					<div className="carInfo">
						<p>datum</p>
						<p>{car.carObj.brand} - {car.carObj.model}</p>
						<p>{car.carObj.vehicleType}, körkort: {car.carObj.requiredDriversLicense}</p>
					</div>
					<div>
						<button data-id={car.carObj._id} data-datestring={car.dateString} onClick={this.confirmAnullment} className="btn">Avboka</button>
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

	componentDidMount(){
		let self = this;
		axios.get(`http://localhost:3000/users/${this.props.userId}`)
		.then(res => {
			console.log(res.data.bookedCars);
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

	renderCars(data){
		this.setState({
			bookedCars: data
		});
	}

	renderVehicles(data){
		this.setState({
			carBookings: data
		});
	}
	
	anullBooking(ev){
		let carId = ev.target.getAttribute('data-id');
		let dateString = ev.target.getAttribute('data-datestring');
		// 
		//console.log(carTime);
		let newBookedCars = [];
		let newBookingsForCar = [];
		
		this.state.bookedCars.forEach(car => {
			if (car.dateString !== dateString){
				newBookedCars.push(car);
			}
		});
		console.log("newBookedCars", newBookedCars);
		let pickedCar = this.state.carBookings.find(car => {
			return car._id === carId
		});
		
		let newBookingsForCarDoc = pickedCar.bookings.filter(book => {
			return book.dateString !== dateString
		})
		console.log("pickedCar ", pickedCar);
		this.updateUserDocument(newBookedCars);
		this.updateVehicleDocument(newBookingsForCarDoc, carId);
		
		console.log(newBookedCars);
		this.setState({
			bookedCars: newBookedCars,
			view: 'AnullmentConfirm'
		});
		setTimeout( () => {
			this.setState({
				view: 'ShowBookings'
			});
		}, 3000);
	}
	
	updateUserDocument(data){
		axios({
			method: 'put',
			url: `http://localhost:3000/users/${this.props.userId}`,
			data: {
				bookedCars: data
			}
		});
	}
	
	updateVehicleDocument(data, id){
		axios({
			method: 'put',
			url: `http://localhost:3000/vehicles/${id}`,
			data: {
				bookings: data
			}
		});
	}
	
	confirmAnullment(ev){
		this.setState({
			view: 'ConfirmAnull',
			currentId: ev.target.getAttribute('data-id'),
			currentDateString: ev.target.getAttribute('data-datestring')
		});
	}
	
	noAnullment(){
		this.setState({
			view: 'ShowBookings'
		});
	}
}

export default ShowBookings;
