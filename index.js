var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres:postgres@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);

    db.user_create_seed(function(){
      console.log("User Table Init");
    });
    db.vehicle_create_seed(function(){
      console.log("Vehicle Table Init")
    });
})

app.get('/api/users', function (req, res) {
  db.get_users(function (err, users) {
    err ? console.log(err) : res.send(users)
  })
})

app.get('/api/vehicles', function (req, res) {
  db.get_vehicles(function (err, vehicles) {
    err ? console.log(err) : res.send(vehicles)
  })
})

app.post('/api/users', function (req, res) {
  db.add_user([req.body.firstname, req.body.lastname, req.body.email], function (err, user) {
    err ? console.log(err) : res.send(user)
  })
})

app.post('/api/vehicles', function (req, res) {
  db.add_vehicle([req.body.make, req.body.model, req.body.year, req.body.ownerId], function (err, vehicle) {
    err ? console.log(err) : res.send(vehicle)
  })
})

app.get('/api/user/:userId/vehiclecount', function(req, res){
  db.get_vehicle_count([req.params.userId], function(err, count){
    err ? console.log(err) : res.send(count[0])
  })
})

app.get('/api/user/:userId/vehicle', function(req, res){
  db.get_user_vehicles([req.params.userId], function(err, results){
    err ? console.log(err) : res.send(results)
  })
})

app.get('/api/vehicle', function(req, res){
  if (req.query.email){
    db.get_email_vehicles([req.query.email], function(err, vehicles){
      err ? console.log(err) : res.send(vehicles)
    })
  }
  else if (req.query.userFirstStart){
    db.get_vehicles_firstletter([req.query.userFirstStart + '%'], function(err, result){
      err ? console.log(err) : res.send(result)
    })
  }
})

app.get('/api/newervehiclesbyyear', function(req, res){
  db.get_vehicles_year(function(err, result){
    err ? console.log(err) : res.send(result)
  })
})

app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res){
  db.change_owner([req.params.vehicleId, req.params.userId], function(err, results){
    err ? console.log(err) : res.sendStatus(200)
  })
})

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res){
  db.remove_owner([req.params.userId, req.params.vehicleId], function(err, results){
    err ? console.log(err): res.sendStatus(200)
  })
})

app.delete('/api/vehicle/:vehicleId', function(req, res){
  db.delete_vehicle([req.params.vehicleId], function(err, results){
    err ? console.log(err): res.sendStatus(200)
  })
})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
