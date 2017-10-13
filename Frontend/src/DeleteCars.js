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
  handleDelete(ev){
    // let self = this;
    axios({
      method: 'delete',
      url: `/vehicles/${ev.target.parentElement.getAttribute('data-id')}`
    })
    .then(function (response) {
     this.getInfo();
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
    let carList = this.state.carsInfo.map(car=> {
        let content = car.comments.map(x=>{return <li >{x}</li>})
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
          <button className='deleteButton' onClick={this.handleDelete}>Ta bort</button>
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
