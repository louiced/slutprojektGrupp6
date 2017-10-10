import React from 'react';
import axios from 'axios';

class DeleteCars extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      carsInfo: []
    }
  this.handleDelete = this.handleDelete.bind(this)
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
  handleDelete(ev){
    axios({
      method: 'delete',
      url: `http://localhost:3000/vehicles/${ev.target.parentElement.getAttribute('data-id')}`
    })
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
    let carList = this.state.carsInfo.map(car=> {
        return <li className="item" key={car._id} data-id={car._id}>
          <span className="label">brand:</span> <span>{car.brand}</span>
          <span className="label">vehicleType: </span><span> {car.vehicleType}</span>
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
          <button className='deleteButton' onClick={this.handleDelete}>Delete</button>
        </li>
      })

    return (
      <ul className="list-group">
       {carList}
      </ul>
    )
  }
}

export default DeleteCars;
