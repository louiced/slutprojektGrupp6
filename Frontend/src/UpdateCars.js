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
    axios.get('http://localhost:3000/vehicles')
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
      if(car.comments !== null && car.comments!==undefined){
        return <li className="item" key={car._id} data-id={car._id} >
          <span className="label">vehicleType: </span><span> {car.vehicleType}</span>
          <span className="label">brand:</span> <span>{car.brand}</span>
          <span className="label">gearbox:</span> <span>{car.gearbox}</span>
          <span className="label">model: </span><span> {car.model}</span>
          <span className="label">dailyFee: </span><span> {car.dailyFee}</span>
          <span className="label">year: </span><span> {car.year}</span>
          <span className="label">fuel: </span><span> {car.fuel}</span>
          <span className="label">requiredDrivingLicense: </span><span> {car.requiredDrivingLicense}</span>
          <span className="label">comments: </span><span> {car.comments.damages}</span>
          <br/>
          <img className='list-item'  src={car.imgLink} alt=""/>
          <br/>
          <button className='deleteButton'  oonClick={()=>this.props.updateView('update',car)}>Update</button>
        </li>
      }
      else{
        return <li className="item" key={car._id} data-id={car._id} >
          <span className="label">brand:</span> <span>{car.brand}</span>
          <span className="label">gearbox:</span> <span>{car.gearbox}</span>
          <span className="label">model: </span><span> {car.model}</span>
          <span className="label">dailyFee: </span><span> {car.dailyFee}</span>
          <span className="label">year: </span><span> {car.year}</span>
          <span className="label">fuel: </span><span> {car.fuel}</span>
          <span className="label">requiredDrivingLicense: </span><span> {car.requiredDrivingLicense}</span>
          <span className="label">vehicleType: </span><span> {car.vehicleType}</span>
          <br/>
          <img className='list-item'  src={car.imgLink} alt=""/>
          <br/>
          <button className='deleteButton'  onClick={()=>this.props.updateView('update',car)}>Update</button>
        </li>
      }
    })
    return <ul className='li'>{carList}</ul>
  }
}

export default UpdateCars;
