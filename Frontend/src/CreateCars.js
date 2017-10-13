import React, { Component } from 'react';
import axios from 'axios';
import ShowCars from './ShowCars';

class CreateCars extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      vehicleType: '',
      brand: '',
      model: '',
      year: '',
      gearbox: '',
      dailyFee: '',
      comments: '',
      commentArray: [],
      status: ''
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
  fordontype(ev){

    this.setState({
      vehicleType: ev.target.value
    },()=>{})

  }
  handleBrand(ev){
    this.setState({
      brand: ev.target.value
    },()=>{})
  }
  handleModel(ev){
    this.setState({
      model: ev.target.value
    },()=>{})
  }
  handleGearbox(ev){
    this.setState({
      gearbox: ev.target.value
    },()=>{})
  }
  handleStatus(ev){
    this.setState({
      status: ev.target.value
    },()=>{})
  }
  handleDailyFee(ev){
    this.setState({
      dailyFee: ev.target.value
    },()=>{})
  }
  handleComment(ev){
    this.setState({
      comments: ev.target.value

    },()=>{})
  }
  handleYear(ev){
    this.setState({
      year: ev.target.value
    },()=>{})
  }
  createCar(){
    let commentArray = this.state.commentArray;
    commentArray.push(this.state.comments)
    axios({
      method: 'post',
      url: '/vehicles',
      data: {
        vehicleType: this.state.vehicleType,
        brand: this.state.brand,
        model: this.state.model,
        year: this.state.year,
        gearbox: this.state.gearbox,
        dailyFee: this.state.dailyFee,
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

  render(){
    // <option value="personbil">personalCar</option>
    // <option value="lätt lastbil">Lätt lastbil</option>
    // <option value="Trehjuling">Trehjuling</option>
    // <option value="motorcykel">motorcykel</option>
    return <div className='form'>
      <div className="createForm1">
        <select className='selectField' value={this.state.vehicleType}  onChange={this.fordontype}>
          <option value='' disabled defaultValue hidden>Välj Fordonstyp</option>
          <option value="personbil">Personbil</option>
          <option value="lätt lastbil">Lätt lastbil</option>
          <option value="Trehjuling">Trehjuling</option>
          <option value="motorcykel">Motorcykel</option>
          <option value="ATV">ATV</option>
        </select>
         <input type="text" value={this.state.brand} onChange={this.handleBrand} placeholder='Märke'/>
         <input type="text" value={this.state.model} onChange={this.handleModel} placeholder='Modell'/>
      </div>
      <div className="createForm2">
        <input type="text" value={this.state.year} onChange={this.handleYear} placeholder='År'/>
        <input type="text" value={this.state.gearbox} onChange={this.handleGearbox} placeholder='Växellåda'/>
        <input type="text" value={this.state.dailyFee} onChange={this.handleDailyFee} placeholder='Dagshyra'/>
      </div>
      <div className="createForm2 addMargin">
        <select className='selectField status' required value={this.state.status}  onChange={this.handleStatus}>
          <option value='' disabled defaultValue hidden>Välj Status</option>
          <option value="available">Tillgängligt</option>
          <option value="unavailable">Otillgängligt</option>
        </select>
        <textarea type="text" value={this.state.comments} onChange={this.handleComment} placeholder='Kommentarer'/>
        <button className='addButton' onClick={this.createCar}>Lägg till</button>
      </div>
    </div>
  }
}
export default CreateCars;
