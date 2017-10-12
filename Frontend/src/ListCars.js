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
		if (this.props.data.length > 0){
			let list = this.props.data.map(el => {
			return <div className="carBox" key={el._id} data-id={el._id}>
				<span>{el.brand}</span><br/>
				<span>{el.model}</span><br/>
				<span>{el.vehicleType}</span><br/>
				<img className="carImg" src={el.imgLink} alt="#"/>
				<button className="btn" onClick={this.bookCarClick}>Boka</button>
			</div>
		})
		return <ul>{list}</ul>
		} else {
			return <span>Inga bilar överlevde filtret</span>
		}

	}

	componentDidMount(){
		console.log(this.props.returnDate.valueOf());
		console.log(this.props.pickupDate.valueOf());
		let self = this;
		axios.get(`http://localhost:3000/users/${this.props.userId}`)
		.then(res => {
			self.updateStateCars(res.data.cars);
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
			}
		})
		//new Date(1222333).valueOf return number so can compare, new Date(12232323).toLocaleString() can not compare date
		let self = this;
		axios.get(`http://localhost:3000/vehicles/${id}`)
		.then(res => {
			self.updateStateBookings(res.data.bookings, id);
		})
		.catch(err => {
			console.log(err);
		})
	}

	updateStateBookings(list, id){
		this.setState({
			previousCarBookings: list
		});
		this.updateVehicleDocument(id);
	}
	updateStateCars(list){
		this.setState({
			bookedCars: list
		});
	}
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

	updateVehicleDocument(id){
		let list = this.state.previousCarBookings;
		let obj = {
			pickupDate: this.props.pickupDate.valueOf(),
			returnDate: this.props.returnDate.valueOf()
		}
		list.push(obj);
		//console.log(list.length);
		console.log(id);
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

export default ListCars;
