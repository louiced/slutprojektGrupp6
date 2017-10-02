import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import Login from './Login.js';
import Admin1 from './Admin1.js';
import Admin2 from './Admin2.js';
import Admin3 from './Admin3.js';

class App extends Component {
  render() {
    //conditional rendering:
    //rendera Admin if isLoggedInAsAdmin = true
    //rendera Consumer if isLoggedInAsConsumer = true
    
    return (
      <div className="App flex-col">
        <Header />
         {/*
        <Login />
        
        Admin-relaterade components, renderas i Admin??? */}
        <Admin1 />
        <Admin2 />
        <Admin3 />
        
          
        {/* Consumer-relaterade components */}
      </div>
      
    );
  }
}

export default App;
