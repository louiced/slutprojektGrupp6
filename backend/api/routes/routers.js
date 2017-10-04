'use strict';
module.exports = (app) => {
  var olssonApi = require('../controllers/olssonController.js');
  
  app.route('/vehicles')
    .get(olssonApi.list_all_vehicles) //visa alla fordon för admin och kund
    .post(olssonApi.create_a_vehicle); //lägg till nytt fordon
  
  app.route('/vehicles/:vehicleId')
    .get(olssonApi.read_a_vehicle)  //
    .put(olssonApi.update_a_vehicle)  //Lägg till ny information för fordon (admin), även vid uthyrning - uthyrd: true
    .delete(olssonApi.delete_a_vehicle);  //Ta bort ett fordon
  
  app.route('/users')
    .get(olssonApi.list_all_users)  //Visa alla users, vid login
    .post(olssonApi.create_a_user);   //Skapa nytt konto
  
  app.route('/users/:userId')
    .get(olssonApi.read_a_user) //Mina bokningar
    .put(olssonApi.update_a_user) //uppdatera users med fordonsobjekt
    .delete(olssonApi.delete_a_user); //ta bort user

}