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
      if(car.comments.length !== 0){
        let content = car.comments.map(x=>{return <li>{x}</li>})
      // let commentList = car.comments.map(x=>{
      //   console.log(x)
        // let r = Object.keys(x) //new array with all keys in comments array
        // r.forEach(y=>{x[y]})
        // return <li>{}</li>
        return <li className="item" key={car._id} data-id={car._id} >
          <span className="label">vehicleType: </span><span> {car.vehicleType}</span>
          <span className="label">brand:</span> <span>{car.brand}</span>
          <span className="label">gearbox:</span> <span>{car.gearbox}</span>
          <span className="label">model: </span><span> {car.model}</span>
          <span className="label">dailyFee: </span><span> {car.dailyFee}</span>
          <span className="label">year: </span><span> {car.year}</span>
          <span className="label">fuel: </span><span> {car.fuel}</span>
          <span className="label">requiredDrivingLicense: </span><span> {car.requiredDrivingLicense}</span>
          <span className="label">comments: </span><span> <ul className='li'>{content}</ul></span>
          <br/>
          <img className='list-item'  src={car.imgLink} alt=""/>
          <br/>
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
        </li>
      }
    })
    return <div><div>formular</div><ul className='li'>{carList}</ul></div>
  }
}

export default ShowCars;
