import React from 'react';
import axios from 'axios';

class ShowCars extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      carsInfo: [],
      maxRentFilter: 5000,
			fuelFilter: undefined,
			driveLicFilter: undefined,
			gearFilter: undefined
    }
   this.filterCars = this.filterCars.bind(this);
   this.findCars = this.findCars.bind(this);
   this.handlemaxRentFilter = this.handlemaxRentFilter.bind(this);
   this.handlefuelFilter = this.handlefuelFilter.bind(this);
   this.handledriveLicFilter = this.handledriveLicFilter.bind(this);
   this.handlegearFilter = this.handlegearFilter.bind(this);
  }
  filterCars(data){
		let newData = [];
		for (let o in data){
			let obj = data[o];
			if(obj.gearbox === this.state.gearFilter || this.state.gearFilter === undefined){
				if(obj.fuel === this.state.fuelFilter || this.state.fuelFilter === undefined){
					if(obj.dailyFee <= this.state.maxRentFilter){
						if(obj.driversLicense === this.state.driveLicFilter || this.state.driveLicFilter === undefined){
							newData.push(obj);
						}
					}
				}
			}
		}
    this.setState({
      carsInfo: newData
    })
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
  findCars(){
    let self = this
    axios.get('http://localhost:3000/vehicles')
    .then(function (response) {
      self.filterCars(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render(){
    let carList = this.state.carsInfo.map(car=> {
      // if(car.comments.length !== 0){
        let content = car.comments.map(x=>{return <li>{x}</li>})
      // let commentList = car.comments.map(x=>{
      //   console.log(x)
        // let r = Object.keys(x) //new array with all keys in comments array
        // r.forEach(y=>{x[y]})
        // return <li>{}</li>
        return <li className="item" key={car._id} data-id={car._id} >
          <span className="label">Brand:</span> <span>{car.brand}</span>
          <span className="label">Gearbox:</span> <span>{car.gearbox}</span>
          <span className="label">Model: </span><span> {car.model}</span>
          <span className="label">DailyFee: </span><span> {car.dailyFee}</span>
          <span className="label">Year: </span><span> {car.year}</span>
          <span className="label">Fuel: </span><span> {car.fuel}</span>
          <span className="label">RequiredDriversLicense: </span><span> {car.requiredDriversLicense}</span>
          <span className="label">VehicleType: </span><span> {car.vehicleType}</span>
          <span className="label">Status: </span><span> {car.status}</span>
          <span className="label">Comments: </span><span> <ul className='li'>{content}</ul></span>
          <br/>
          <img className='list-item'  src={car.imgLink} alt=""/>
          <br/>
        </li>
      //}
      // else{
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
      //     <br/>
      //     <img className='list-item'  src={car.imgLink} alt=""/>
      //     <br/>
      //   </li>
      // }
    })
    return <div>
      <div className="createForm2">
        <input type="text" value={this.state.maxRentFilter} onChange={this.handlemaxRentFilter} placeholder='maxRentFilter'/>
        <input type="text" value={this.state.fuelFilter} onChange={this.handlefuelFilter} placeholder='fuelFilter'/>
     </div>
     <div className="createForm2">
       <input type="text" value={this.state.gearFilter} onChange={this.handlegearFilter} placeholder='gearFilter'/>
       <input type="text" value={this.state.driveLicFilter} onChange={this.handledriveLicFilter} placeholder='driveLicFilter'/>
     </div>
     <button className='deleteButton' onClick={this.findCars}>Filter</button>
      <ul className='li'>{carList}</ul>
    </div>
  }
}

export default ShowCars;
