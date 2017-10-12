import React from 'react';
import axios from 'axios';

class Update extends React.Component{
  constructor(props){
    super(props);
    if(this.props.data.comments!==null && this.props.data.comments!== undefined){
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
    }
    else{
      this.state = {
        vehicleType: this.props.data.vehicleType,
        brand: this.props.data.brand,
        model: this.props.data.model,
        year: this.props.data.year,
        gearbox: this.props.data.gearbox,
        dailyFee: this.props.data.dailyFee,
        status: 'available'
      }
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
      method: 'put',
      url: `http://localhost:3000/vehicles/${this.state.id}`,
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
            <textarea type="text" value={this.state.comments} onChange={this.handleComment} placeholder={this.props.data.comments.damages}/>
            <button className='addButton' onClick={this.createCar}>Lägg till</button>
          </div>
        </div>
      )
  }
}

export default Update;
