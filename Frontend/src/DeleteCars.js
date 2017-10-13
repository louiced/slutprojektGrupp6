import React from 'react';
import axios from 'axios';

class DeleteCars extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      carsInfo: []
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }
  //första när laddar sidan, ska anropa getInfo function
  componentDidMount(){
    this.getInfo();
  }
  getInfo(){
    axios.get('/vehicles')
    .then(function (response) {
      this.setState({
        carsInfo: response.data
      }, ()=>{})
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
  //med delete Api för att ta bort specifik bil
  handleDelete(ev){
    axios({
      method: 'delete',
      url: `/vehicles/${ev.target.getAttribute('data-id')}`
    })
    .then(function (response) {
      this.getInfo();
    }.bind(this))
    .catch(function (error) {
    });
  }

  render(){
    let key = 0;
    let carList = this.state.carsInfo.map(car=> {
      let content = car.comments.map(x=>{return <li key={x}>{x}</li>})
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
          <button data-id={car._id} className='btn' onClick={this.handleDelete}>Ta bort</button>
        </div>
      </div>
    })
    return (
      <ul className="list-group">
        {carList}
      </ul>
    )
  }
}

export default DeleteCars;
