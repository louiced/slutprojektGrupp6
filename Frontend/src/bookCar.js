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
	}
	render(){
		return <div>
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
					<option value="" defaultValue></option>
					<option value="automatic">Automatisk</option>
					<option value="manual">Manuell</option>
				</select>
					</span>
				<span>Körkortstyp <select name="driveLic">
					<option value="" defaultValue></option>
					<option value="A" >A</option>
					<option value="B">B</option>
				</select>
					</span>
				<span>Bränsle <select name="fuel">
					<option value="" defaultValue></option>
					<option value="Diesel" >Diesel</option>
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
	}

	findCars(ev){
		console.log('click');

		// Switch view: Render new component
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
