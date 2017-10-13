import React from 'react';
import axios from 'axios';

class ShowCars extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      carsInfo: [],
      maxRentFilter: undefined,
			fuelFilter: undefined,
			driveLicFilter: undefined,
			gearFilter: undefined
    }
   //this.filterCars = this.filterCars.bind(this);
   this.findCars = this.findCars.bind(this);
   this.handlemaxRentFilter = this.handlemaxRentFilter.bind(this);
   this.handlefuelFilter = this.handlefuelFilter.bind(this);
   this.handledriveLicFilter = this.handledriveLicFilter.bind(this);
   this.handlegearFilter = this.handlegearFilter.bind(this);
  }
  
  handlemaxRentFilter(ev){
    this.setState({
      maxRentFilter: ev.target.value
    })
  }
  handlefuelFilter(ev){
    this.setState({
      fuelFilter: ev.target.value
    })
  }
  handledriveLicFilter(ev){
    this.setState({
      driveLicFilter: ev.target.value
    })
  }
  handlegearFilter(ev){
    this.setState({
      gearFilter: ev.target.value
    })
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
  findCars(){
    let self = this
    axios.get('/vehicle',{
      params: {
        gearbox: this.state.gearFilter,
        fuel: this.state.fuelFilter,
        requiredDriversLicense: this.state.driveLicFilter,
        dailyFee: this.state.maxRentFilter
      }
    })
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
    let key = 0;
    let carList = this.state.carsInfo.map(car=> {
      let content = car.comments.map(x=>{return <li key={x}>{x}</li>})
      return <div key={key++} className="listCarBox row">
        <div>
          <h4>{car.brand} - {car.model}</h4>
			<p>Fordonstyp: {car.vehicleType}</p>
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
		</div>
    })
    return <div>
      <div className="createForm2">
        <input type="text" placeholder="Hyra" value={this.state.maxRentFilter} onChange={this.handlemaxRentFilter}/>
        <input type="text" value={this.state.fuelFilter} onChange={this.handlefuelFilter} placeholder='Bränsle'/>
     </div>
     <div className="createForm2">
       <input type="text" value={this.state.gearFilter} onChange={this.handlegearFilter} placeholder='Växellåda'/>
       <input type="text" value={this.state.driveLicFilter} onChange={this.handledriveLicFilter} placeholder='Körkort'/>
     </div>
     <button className='btn' onClick={this.findCars}>Filtrera</button>
		{/*<ul className='li'>{carList}</ul>*/}
		<ul>{carList}</ul>
    </div>
  }
}

export default ShowCars;
