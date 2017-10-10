import React from 'react';
import axios from 'axios';

class ShowCars extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      carsInfo: []
    }

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

  render(){
    let carList = this.state.carsInfo.map(car=> {
      // console.log('dsfdsf', car)
        return <li className="item" key={car._id} >
          <span className="label">vehicleType: </span><span> {car.vehicleType}</span>
          <span className="label">brand:</span> <span>{car.brand}</span>
          <span className="label">gearbox:</span> <span>{car.gearbox}</span>
          <span className="label">model: </span><span> {car.model}</span>
          <span className="label">dailyFee: </span><span> {car.dailyFee}</span>
          <span className="label">year: </span><span> {car.year}</span>
          <span className="label">fuel: </span><span> {car.fuel}</span>
          <span className="label">status: </span><span> {car.status}</span>
          <span className="label">requiredDrivingLicense: </span><span> {car.requiredDrivingLicense}</span>
          <br/>
          <img className='list-item'  src={car.imgLink} alt=""/>
          <br/>
        </li>
      })
    return (
      <ul className="list-group">
       {carList}
      </ul>
    )
  }
}

export default ShowCars;
