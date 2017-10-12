import React from 'react';
import './App.css';
import axios from 'axios';

class ShowBookings extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			bookedCars: []
		};
		this.anullBooking = this.anullBooking.bind(this);
		this.renderCars = this.renderCars.bind(this);
	}
	render(){
		let view;
		if (this.state.bookedCars.length > 0){ //
			let key = 0;
				let carList = this.state.bookedCars.map(car => {
					console.log('carObj ', car.carObj)
				return <div className="carBox" key={key++}>
				<span>{car.carObj.brand}</span><br/>
				<span>{car.carObj.model}</span><br/>
				<span>{car.carObj.vehicleType}</span><br/>
				<img className="carImg" src={car.carObj.imgLink} alt="#"/> 
					<button data-id={car.carObj._id} onClick={this.anullBooking} className="btn">Avboka</button>
				</div>
			})
				view = <div>
					<h2>Mina bokningar</h2>
					<ul>{carList}</ul>
				</div>
		} else {
			view = <div><h2>Mina bokningar</h2>
				<span>Inga bokningar för närvarande</span><br/></div>
		}
		
		return view;
	}
	
	componentDidMount(){
		let self = this;
		axios.get(`http://localhost:3000/users/${this.props.userId}`)
		.then(res => {
			self.renderCars(res.data.cars);
		})
		.catch(err => {
			console.log(err);
		})
		//this.anullBooking();
	}
	
	renderCars(data){
		this.setState({
			bookedCars: data
		});
	}
	
	anullBooking(ev){
		let carId = ev.target.getAttribute('data-id');
		
		let newBookedCars = this.state.bookedCars.filter(car => {
			return car.carObj._id !== carId
		});
		
		axios({
			method: 'put',
			url: `http://localhost:3000/users/${this.props.userId}`,
			data: {
				cars: newBookedCars
			}
		});
		console.log(newBookedCars);
		this.setState({
			bookedCars: newBookedCars
		});
	}
}

export default ShowBookings;