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
		console.log(this.props.data);
		let list = this.props.data.map(el => {
			return <div className="carBox" key={el._id} data-id={el._id}>
				<span>{el.brand}</span><br/>
				<span>{el.model}</span><br/>
				<span>{el.fordonstyp}</span><br/>
				<img className="carImg" src={el.imgLink} alt="#"/>
				<button className="btn" onClick={this.bookCarClick}>Boka</button>
			</div>
		})
		return <ul>{list}</ul>
	}
	
	componentDidMount(){
		//console.log('componentDidMount');
		let self = this;
		axios.get('http://localhost:3000/users/59d73b7c0f2e760c2853b0f0')
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
				obj = data;
			}
		})
		
		this.updateUserDocument(obj);
		
	}
	
	updateStateCars(list){
		this.setState({
			bookedCars: list
		});
	}
	
	updateUserDocument(data) {
		let bookedCars = this.state.bookedCars;
		bookedCars.push(data);
		axios({
			method: 'put',
			url: 'http://localhost:3000/users/59d73b7c0f2e760c2853b0f0',
			data: {
				cars: bookedCars
			}
		});
	}
	
	updateVehicleDocument(id){
		
	}
}

export default ListCars;