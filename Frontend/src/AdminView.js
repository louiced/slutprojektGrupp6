import React from 'react';
import ShowCars from './ShowCars.js';
import UpdateCars from './UpdateCars.js';
import CreateCars from './CreateCars.js';
import DeleteCars from './DeleteCars.js';
import LoginComponent from './LoginComponent.js';
import Update from './Update.js';

class AdminView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tabs: [
				{
					class: 'active',
					id: 'tab1'
				},
				{
					class: '',
					id: 'tab2'
				},
        {
					class: '',
					id: 'tab3'
				},
        {
					class: '',
					id: 'tab4'
				}
			],
			view: 'showCars'
    }
    this.switchTab = this.switchTab.bind(this);
    this.updateView = this.updateView.bind(this);
    // this.switchCreateView = this.switchCreateView.bind(this);
    // this.switchUpdateView = this.switchUpdateView.bind(this);
    // this.switchDeleteView = this.switchDeleteView.bind(this);
}
// switchCreateView(){
//   this.setState({
//     view: 'createCars'
//   })
// }
// switchUpdateView(){
//   this.setState({
//     view: 'updateCars'
//   })
// }
// switchDeleteView(){
//   this.setState({
//     view: 'deleteCars'
//   })
// }
updateView(str,data){
  this.setState({
    view: str,
    data: data
  })
}
switchTab(ev){
  let id = ev.target.id;
  let newTabs = [];
  let view;
  this.state.tabs.forEach(el => {
    el.id === id ? newTabs.push({
      class: 'active',
      id: el.id
    }) : newTabs.push({
      class: '',
      id: el.id
    });
  });
  switch(id){
    case 'tab1':
      view = 'showCars'
      break;
    case 'tab2':
      view = 'createCars'
      break;
    case 'tab3':
      view = 'updateCars'
      break;
    case 'tab4':
      view = 'deleteCars'
      break;
  }

  this.setState({
    tabs: newTabs,
    view: view
  });
}
  render(){
    let navBar = <ul className="navBar">
          <li><span className={this.state.tabs[0].class} onClick={this.switchTab} id="tab1">Read Cars</span></li>
          <li><span className={this.state.tabs[1].class} onClick={this.switchTab} id="tab2">Create Cars</span></li>
          <li><span className={this.state.tabs[2].class} onClick={this.switchTab} id="tab3">Update Cars</span></li>
          <li><span className={this.state.tabs[3].class} onClick={this.switchTab} id="tab4">Delete Cars</span></li>
        </ul>;
      let view;
          switch(this.state.view){
            case 'showCars':
              view = <div>{navBar} <ShowCars/></div>;
              break;
            case  'createCars':
              view =  <div>{navBar} <CreateCars updateView={this.switchTab}/></div>;
              break;
            case  'updateCars':
              view =  <div>{navBar} <UpdateCars updateView={this.updateView} /></div>;
              break;
            case  'deleteCars':
              view = <div>{navBar} <DeleteCars/></div>;
              break;
            case  'update':
              view = <div>{navBar} <Update data={this.state.data}/></div>;
              break;
          }
    return view;
  }

}

export default AdminView;
