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

  fordontype(ev){
    this.setState({
      vehicleType: ev.target.value
    },()=>{})
  }
  // efter man skrev in vehicleType input, setState med ny value i input fälte
  handleBrand(ev){
    this.setState({
      brand: ev.target.value
    },()=>{})
  }
  // efter man skrev in brand input, setState med ny value i input fälte
  handleModel(ev){
    this.setState({
      model: ev.target.value
    },()=>{})
  }
   // efter man skrev in modell input, setState med ny value i input fälte
  handleGearbox(ev){
    this.setState({
      gearbox: ev.target.value
    },()=>{})
  }
  // efter man skrev in gearbox input, setState med ny value i input fälte
  handleStatus(ev){
    this.setState({
      status: ev.target.value
    },()=>{})
  }
  // efter man skrev in status input, setState med ny value i input fälte
  handleDailyFee(ev){
    this.setState({
      dailyFee: ev.target.value
    },()=>{})
  }
  // efter man skrev in dailyFee input, setState med ny value i input fälte
  handleComment(ev){
    this.setState({
      comments: ev.target.value
    },()=>{})
  }
  // efter man skrev in comments input, setState med ny value i input fälte
  handleYear(ev){
    this.setState({
      year: ev.target.value
    },()=>{})
  }
  createCar(){
    let commentArray = this.state.commentArray;
    commentArray.push(this.state.comments);
    //efter user har skrivit kommentarer, skick kommentarer till array
    //nedan uppdatera request with nya info
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
  //rendera sidan
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
