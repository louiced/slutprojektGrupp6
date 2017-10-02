import React, { Component } from 'react';
import './App.css';

class Admin1 extends Component {
  render() {
    return (
      <div className="container flex-col">
        
        <div className="subHeader">
          <button className="btnAdm active">Alla fordon</button>
          <button className="btnAdm">Lägg till</button>
          
          <button className="btnAdm">Uppdatera</button>
          <button className="btnAdm">Radera</button>
        </div>
        
        <div className="flex-row">
          <h4>Sortera på:</h4>
          <label htmlFor="fordonstyp"><input id="fordonstyp" type="radio" name="sortBy"></input>fordonstyp</label>
          <label htmlFor="brand"><input id="brand" type="radio" name="sortBy"></input>märke</label>
          <label htmlFor="dagshyra"><input id="dagshyra" type="radio" name="sortBy"></input>dagshyra</label>
          <label htmlFor="gearbox"><input id="gearbox" type="radio" name="sortBy"></input>växellåda</label>
          
          <button id="ok" className="okBtn">OK</button>
        </div>
        
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Fordonstyp</th>
              <th>Behörighet</th> 
              <th>Märke</th>
              <th>Modell</th>
              <th>År</th>
              <th>Hyra</th>
              <th>Låda</th>
              <th>Status</th>
            </tr>
            <tr>
              <th><input type="checkbox"></input></th>
              <td>Personbil</td>
              <td>B</td> 
              <td>Mazda</td>
              <td>323i</td>
              <td>1991</td>
              <td>manuell</td>
              <td>298</td>
              <td></td>
            </tr>
            <tr className="unavailable">
              <th><input type="checkbox"></input></th>
              <td>Personbil</td>
              <td>B</td> 
              <td>Volvo</td>
              <td>V40</td>
              <td>1997</td>
              <td>manuell</td>
              <td>349</td>
              <td>uthyrd: 171001-171003</td>
            </tr>
            <tr>
              <th><input type="checkbox"></input></th>
              <td>Lätt lastbil</td>
              <td>B</td> 
              <td>Mercedes-Benz</td>
              <td>Sprinter 316 CDI</td>
              <td>2003</td>
              <td>?</td>
              <td>498</td>
              <td></td>
            </tr>
            <tr>
              <th><input type="checkbox"></input></th>
              <td>Lätt lastbil</td>
              <td>B</td> 
              <td>Volkswagen</td>
              <td>LT 46b</td>
              <td>1999</td>
              <td>?</td>
              <td>398</td>
              <td></td>
            </tr>
            <tr className="unavailable">
              <th><input type="checkbox"></input></th>
              <td>Personbil</td>
              <td>B</td> 
              <td>Peugeot</td>
              <td>308</td>
              <td>2007</td>
              <td>manuell</td>
              <td>298</td>
              <td>reparation: 171001-171008</td>
            </tr>
            <tr>
              <th><input type="checkbox"></input></th>
              <td>Tung lastbil</td>
              <td>CE</td> 
              <td>Mercedes-Benz</td>
              <td>Atego 8 16 L 4 x 2</td>
              <td>1995</td>
              <td>?</td>
              <td>850</td>
              <td></td>
            </tr>
            <tr>
              <th><input type="checkbox"></input></th>
              <td>Personbil</td>
              <td>B</td> 
              <td>Audi</td>
              <td>A4</td>
              <td>2000</td>
              <td>automat</td>
              <td>398</td>
              <td></td>
            </tr>
            <tr>
              <th><input type="checkbox"></input></th>
              <td>Personbil</td>
              <td>B</td> 
              <td>Volvo</td>
              <td>S50</td>
              <td>2005</td>
              <td>manuell</td>
              <td>498</td>
              <td></td>
            </tr>
            <tr>
              <th><input type="checkbox"></input></th>
              <td>Motorcykel</td>
              <td>A</td> 
              <td>Yamaha</td>
              <td>YCF R1</td>
              <td>2001</td>
              <td>?</td>
              <td>498</td>
              <td></td>
            </tr>
            <tr>
              <th><input type="checkbox"></input></th>
              <td>Personbil</td>
              <td>B</td> 
              <td>Toyota</td>
              <td>Aygo</td>
              <td>?</td>
              <td>manuell</td>
              <td>198</td>
              <td></td>
            </tr>
            <tr>
              <th><input type="checkbox"></input></th>
              <td>ATV</td>
              <td>A1</td> 
              <td>Can-Am</td>
              <td>Outlander 570</td>
              <td>2008</td>
              <td>manuell</td>
              <td>598</td>
              <td></td>
            </tr>
            <tr>
              <th><input type="checkbox"></input></th>
              <td>Personbil</td>
              <td>B</td> 
              <td>Saab</td>
              <td>9-5 2.3 Super linear</td>
              <td>2003</td>
              <td>automat</td>
              <td>198</td>
              <td></td>
            </tr>
            <tr>
              <th><input type="checkbox"></input></th>
              <td>Trehjuling</td>
              <td>?</td> 
              <td>Can-Am</td>
              <td>Spyder Roadster</td>
              <td>2015</td>
              <td>?</td>
              <td>798</td>
              <td></td>
            </tr>
            <tr>
              <th><input type="checkbox"></input></th>
              <td>Personbil</td>
              <td>B</td> 
              <td>Kia</td>
              <td>Optima Kombi</td>
              <td>2001</td>
              <td>manuell</td>
              <td>498</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        
      </div>
    );
  }
}

export default Admin1;