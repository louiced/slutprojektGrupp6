import React from 'react';
import axios from 'axios';

class Update extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        vehicleType: this.props.data.vehicleType,
        id: this.props.data._id,
        brand: this.props.data.brand,
        model: this.props.data.model,
        year: this.props.data.year,
        gearbox: this.props.data.gearbox,
        dailyFee: this.props.data.dailyFee,
        comments: this.props.data.comments,
        commentArray: [],
        status: 'available'
      }
    this.createCar = this.createCar.bind(this);
    this.fordontype = this.fordontype.bind(this);
    this.handleBrand = this.handleBrand.bind(this);
    this.handleModel = this.handleModel.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleGearbox = this.handleGearbox.bind(this);
    this.handleDailyFee = this.handleDailyFee.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleYear = this.handleYear.bind(this);
  }
// after man wrote in vehicle input, setState with new value in input field
  fordontype(ev){
    this.setState({
      vehicleType: ev.target.value
    },()=>{})
  }
  // after man wrote in brand input, setState with new value in input field
  handleBrand(ev){
    this.setState({
      brand: ev.target.value
    },()=>{})
  }
  // after man wrote in model input, setState with new value in input field
  handleModel(ev){
    this.setState({
      model: ev.target.value
    },()=>{})
  }
   // after man wrote in gearbox input, setState with new value in input field
  handleGearbox(ev){
    this.setState({
      gearbox: ev.target.value
    },()=>{})
  }
  // after man wrote in status input, setState with new value in input field
  handleStatus(ev){
    this.setState({
      status: ev.target.value
    },()=>{})
  }
  // after man wrote in dailyFee input, setState with new value in input field
  handleDailyFee(ev){
    this.setState({
      dailyFee: ev.target.value
    },()=>{})
  }
  // after man wrote in dailyFee input, setState with new value in input field
  handleComment(ev){
    this.setState({
      comments: ev.target.value
    },()=>{})
  }
  // after man wrote in year input, setState with new value in input field
  handleYear(ev){
    this.setState({
      year: ev.target.value
    },()=>{})
  }
  createCar(){
    let commentArray = this.state.commentArray;
    commentArray.push(this.state.comments);
    //after user have writted comments, send comments to array
    //below will be update request with new info to update
    axios({
      method: 'put',
      url: `/vehicles/${this.state.id}`,
      data: {
        vehicleType: this.state.vehicleType,
        brand: this.state.brand,
        model: this.state.model,
        year: this.state.year,
        gearbox: this.state.gearbox,
        dagshyra: this.state.dailyFee,
        status: this.state.status,
        comments: commentArray
      }
    })
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  //render page
  render(){
      return(
        <div>
          <div className="createForm1">
            <select required value={this.state.vehicleType}  onChange={this.fordontype}>
              <option disabled defaultValue hidden>{this.props.data.vehicleType}</option>
              <option value="personbil">Personbil</option>
              <option value="lätt lastbil">Lätt lastbil</option>
              <option value="Trehjuling">Trehjuling</option>
              <option value="motorcykel">Motorcykel</option>
              <option value="ATV">ATV</option>
            </select>
             <input type="text" value={this.state.brand} onChange={this.handleBrand} placeholder={this.props.data.brand}/>
             <input type="text" value={this.state.model} onChange={this.handleModel} placeholder={this.props.data.model}/>
          </div>
          <div className="createForm2">
            <input type="text" value={this.state.year} onChange={this.handleYear} placeholder={this.props.data.year}/>
            <input type="text" value={this.state.gearbox} onChange={this.handleGearbox} placeholder={this.props.data.gearbox}/>
            <input type="text" value={this.state.dailyFee} onChange={this.handleDailyFee} placeholder={this.props.data.dailyFee}/>
          </div>
          <div className="createForm2">
            <select required value={this.state.status}  onChange={this.handleStatus}>
              <option disabled defaultValue hidden>{this.props.data.status}</option>
              <option value="available">Tillgänligt</option>
              <option value="unavailable">Otillgänligt</option>
            </select>
            <textarea type="text" value={this.state.comments} onChange={this.handleComment} placeholder={this.props.data.comments}/>
            <button className='addButton' onClick={this.createCar}>Lägg till</button>
          </div>
        </div>
      )
  }
}

export default Update;
