var express = require('express'),
    router = express.Router(),
    Vehicle = require('./models/vehicleModel.js');

router.get('/', (req, res) => {
  res.sendFile('index.html');
})
  var memberlist = [];
/*
router.get('/vehicles', (req, res) => {
  //lista alla fordon
  Vehicle.find({}, function(err, data) {
    if(err)
      console.log(err);
    memberlist.push(data);
    //console.log(`min data: ${data}`);
  });
  console.log('lista: ' + memberlist);
  res.render('memberList', {members: memberlist, namn: "Lou"});
});

router.post('/members', (req, res) => {
  //lägg till ny medlem
});
*/
module.exports = router;