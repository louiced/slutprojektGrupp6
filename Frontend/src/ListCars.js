import React from 'react';
import './App.css';
import axios from 'axios';

class ListCars extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			bookedCars: []
		};
		this.bookCarClick = this.bookCarClick.bind(this);
		this.updateUserDocument = this.updateUserDocument.bind(this);
		this.updateStateCars = this.updateStateCars.bind(this);
	}
	render(){
		console.log(this.props.unavailableCars);
		let view;
		if (this.props.data.length > 0 && this.props.unavailableCars.length > 0){
			console.log("length > 0" );
			let list = this.props.data.map(el => {
			return <div className="carBox row" key={el._id} data-id={el._id}>
				<div>
					<img className="carImg" src={el.imgLink} alt="#"/>
				</div>
				<div className="carInfo">
					<p>datum</p>
					<p>{el.brand} - {el.model}</p>
					<p>{el.vehicleType}</p>
				</div>
				<div>
					<button className="btn" onClick={this.bookCarClick}>Boka</button>
				</div>
			</div>
			})
			let unavList = this.props.unavailableCars.map(el => {
			return <div className="carBox row" key={el._id} data-id={el._id}>
				<div>
					<img className="carImg" src={el.imgLink} alt="#"/>
				</div>
				<div className="carInfo">
					<p>datum</p>
					<p>{el.brand} - {el.model}</p>
					<p>{el.vehicleType}</p>
				</div>
				<div>
					<button className="btn" disabled onClick={this.bookCarClick}>Avboka</button>
				</div>
			</div>
			})
		view = <div>
					<ul>{list}</ul>
					<ul>{unavList}</ul>
				</div>								   
		} else if(this.props.data.length > 0 && this.props.unavailableCars.length <= 0){
			let list = this.props.data.map(el => {
			return <div className="carBox" key={el._id} data-id={el._id}>
				<span>{el.brand}</span><br/>
				<span>{el.model}</span><br/>
				<span>{el.vehicleType}</span><br/>
				<img className="carImg" src={el.imgLink} alt="#"/>
				<button className="btn" onClick={this.bookCarClick}>Boka</button>
			</div>
			})
			view = <ul>{list}</ul>
		}
 		
		return <div>{view}</div>
		
	}
	
	componentDidMount(){
		console.log(this.props.returnDate.valueOf());
		console.log(this.props.pickupDate.valueOf());
		console.log(this.props.pickupDate.toLocaleString());
		
		
		// Gets previous booked cars of loggedIn user
		let self = this;
		axios.get(`http://localhost:3000/users/${this.props.userId}`)
		.then(res => {
			self.updateStateCars(res.data.cars); //List of booked cars for user
		})
		.catch(err => {
			console.log(err);
		})
	}
	
	bookCarClick(ev){
		let id = ev.target.parentElement.getAttribute('data-id');
		let obj;
		this.props.data.forEach(data => {
			if (data._id === id){
				obj = {
					carObj: data,
					pickupDate: this.props.pickupDate.valueOf(),
					returnDate: this.props.returnDate.valueOf()
				};
				this.updateUserDocument(obj);
			}
		})
		let self = this;
		axios.get(`http://localhost:3000/vehicles/${id}`)
		.then(res => {
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
		console.log(this.state.bookedCars);
		let bookedCars = this.state.bookedCars;
		
		bookedCars.push(data);
		axios({
			method: 'put',
			url: `http://localhost:3000/users/${this.props.userId}`,
			data: {
				cars: bookedCars
			}
		});
	}
	
	
	// Updates VehicleDB with previous bookings AND new booking
	updateVehicleDocument(id){
		let list = this.state.previousCarBookings;
		let pickupString = this.props.pickupDate.toLocaleString();
		let returnString = this.props.returnDate.toLocaleString();
		let dateString = `${pickupString} - ${returnString}`;
		//console.log("dateString", dateString);
		let obj = {
			pickupDate: this.props.pickupDate.valueOf(),
			returnDate: this.props.returnDate.valueOf(),
			dateString: dateString
		};
		list.push(obj);
		//console.log(list.length);
		axios({
			method: 'put',
			url: `http://localhost:3000/vehicles/${id}`,
			data: {
				bookings:  list
			}
		});
		
	}
}

/*axios({
			method: 'put',
			url: `http://localhost:3000/vehicles/59dccaf4d556aa9aef8ea0e1`,
			data: {
				bookings: list
			}
		});*/

/*

*/

export default ListCars;