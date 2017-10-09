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
    let carList = this.state.carsInfo.map(car=><li className="" key={car._id} ><p>brand: {car.brand}</p><p>fordonstyp: {car.fordonstyp}</p>
    <p>gearbox: {car.gearbox}</p><p>year: {car.year}</p>
     <img className='list-item'  src={car.imgLink} alt=""/></li>)
    return (
      <ul className="list-group">
       {carList}
      </ul>
    )
  }
}

export default ShowCars;
