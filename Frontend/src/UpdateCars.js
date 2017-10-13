import React from 'react';
import axios from 'axios';
import ShowCars from './ShowCars.js';
import CreateCars from './CreateCars.js';
import DeleteCars from './DeleteCars.js';
import LoginComponent from './LoginComponent.js';
import Update from './Update.js';

class UpdateCars extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      carsInfo: []
    }
  }
  //först ladda sidan visa alla bilarnas info
  componentDidMount(){
    let self = this
    axios.get('/vehicles')
    .then(function (response) {
      self.setState({
        carsInfo: response.data
      }, ()=>{})
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  //
render(){
  let key = 0;
  let carList = this.state.carsInfo.map(car=> {
    // if(car.comments.length !== 0){
    let content = car.comments.map(x=>{return <li key={x} >{x}</li>});
    return <div key={key++} className="listCarBox row">
      <div>
				<p>Fordonstyp: {car.vehicleType}</p>
				<p>Märke: {car.brand}</p>
				<p>Modell: {car.model}</p>
				<p>År: {car.year}</p>
				<p>Växellåda: {car.gearbox}</p>
				<p>Körkort: {car.requiredDriversLicense}</p>
				<p>Bränsle: {car.fuel}</p>
				<p>Dagshyra: {car.dailyFee}</p>
				<p>Status: {car.status}</p>
				<h4>Kommentarer:</h4>
				<ul>{content}</ul>
			</div>
			<div>
				<img className='list-item carImg'  src={car.imgLink} alt=""/>
			</div>
			<div>
				 <button className='btn'  onClick={()=>this.props.updateView('update',car)}>Uppdatera</button>
			</div>
		</div>
    })
    return <ul>{carList}</ul>
  }
}
export default UpdateCars;
