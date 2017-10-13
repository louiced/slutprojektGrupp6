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
    // this.clickUpdateCar = this.clickUpdateCar.bind(this);
  }
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
// clickUpdateCar(ev){
//
//   this.props.updateView('update');
//   let id = ev.target.parentElement.getAttribute('data-id');
//   // for(let n=0;n<this.state.carsInfo.length;n++){
//   //   console.log(this.state.carsInfo)
//   // }
//   this.state.carsInfo.forEach(x=>{
//     if(x._id === id){
//       this.props.updateView('update',x)
//     }
//   })
// }
//this.props.updateView('update',x)
  render(){
    let carList = this.state.carsInfo.map(car=> {
      // if(car.comments.length !== 0){
        let content = car.comments.map(x=>{return <li >{x}</li>});
        return <li className="item" key={car._id} data-id={car._id} >
          <span className="label">Märke:</span> <span>{car.brand}</span>
          <span className="label">Växellåda:</span> <span>{car.gearbox}</span>
          <span className="label">Modell: </span><span> {car.model}</span>
          <span className="label">Dagshyra: </span><span> {car.dailyFee}</span>
          <span className="label">År: </span><span> {car.year}</span>
          <span className="label">Bränsle: </span><span> {car.fuel}</span>
          <span className="label">Obligatoriskt körkort: </span><span> {car.requiredDriversLicense}</span>
          <span className="label">Fordonstyp: </span><span> {car.vehicleType}</span>
          <span className="label">Status: </span><span> {car.status}</span>
          <span className="label">Kommentarer: </span><span> <ul className='li'>{content}</ul></span>
          <br/>
          <img className='list-item'  src={car.imgLink} alt=""/>
          <br/>
          <button className='deleteButton'  onClick={()=>this.props.updateView('update',car)}>Uppdatera</button>
        </li>
      // }
      // else{
      //    let content = car.comments.map(x=>{return <li >{x}</li>});
      //   return <li className="item" key={car._id} data-id={car._id} >
      //     <span className="label">Brand:</span> <span>{car.brand}</span>
      //     <span className="label">Gearbox:</span> <span>{car.gearbox}</span>
      //     <span className="label">Model: </span><span> {car.model}</span>
      //     <span className="label">DailyFee: </span><span> {car.dailyFee}</span>
      //     <span className="label">Year: </span><span> {car.year}</span>
      //     <span className="label">Fuel: </span><span> {car.fuel}</span>
      //     <span className="label">RequiredDriversLicense: </span><span> {car.requiredDriversLicense}</span>
      //     <span className="label">VehicleType: </span><span> {car.vehicleType}</span>
      //     <span className="label">Status: </span><span> {car.status}</span>
      //     <span className="label">Comments: </span><span> <ul className='li'>{content}</ul></span>
      //     <br/>
      //     <img className='list-item'  src={car.imgLink} alt=""/>
      //     <br/>
      //     <button className='deleteButton'  onClick={()=>this.props.updateView('update',car)}>Update</button>
      //   </li>
      // }
    })
    return <ul className='li'>{carList}</ul>
  }
}
export default UpdateCars;
