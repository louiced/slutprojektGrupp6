import React, { Component } from 'react';
import axios from 'axios';

class CreateCars extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fordontype: '',
      brand: '',
      model: '',
      year: '',
      gearbox: '',
      dagshyra: '',
      comment: ''
    }
  this.createCar = this.createCar.bind(this);
   this.fordontype = this.fordontype.bind(this);
   this.handleBrand = this.handleBrand.bind(this);
   this.handleModel = this.handleModel.bind(this);
  }
  fordontype(ev){
    this.setState({
      fordontype: ev.target.value
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
  createCar(){
    debugger
      axios({
        method: 'post',
        url: 'http://localhost:3000/vehicles',
        data: {
          fordonstyp: this.state.fordontype,
          brand: this.state.brand,
          model: this.state.model
        }
      });
    }

  render(){
    return <div className='form'>
      <div className="createForm1">
        <select required value={this.state.fordontype}  onChange={this.fordontype}>
          <option disabled selected hidden>Please Choose fordontype</option>
          <option value="personbil">personbil</option>
          <option value="lätt lastbil">lätt lastbil</option>
          <option value="Trehjuling">Trehjuling</option>
          <option value="motorcykel">motorcykel</option>
          <option value="ATV">ATV</option>
        </select>
         <input type="text" value={this.state.brand} onChange={this.handleBrand} placeholder='brand'/>
         <input type="text" value={this.state.model} onChange={this.handleModel} placeholder='model'/>
      </div>
      <div className="createForm2">
        <input type="text" placeholder='yyyy-mm-dd'/>
        <input type="text" placeholder='gearbox'/>
        <input type="text" placeholder='dagshyra'/>
      </div>
      <div className="createForm2">
        <input type="text" placeholder='kommentar'/>
        <button className='addButton' onClick={this.createCar}>Add</button>
      </div>
    </div>
  }
}
export default CreateCars;
