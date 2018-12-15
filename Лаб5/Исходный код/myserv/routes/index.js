var express = require('express');
var router = express.Router();
const fs = require("fs");

var brocker = require('../brocker')
var stock = require('../stock')

function updateBrocker() {
  fs.writeFile('./brocker.json', JSON.stringify(brocker), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

router.get('/brockers/', function (req, res, next) {
  res.send(brocker);
});

router.get('/brockers/:id', function (req, res, next) {
  const id = req.params.id;
  const index = brocker.data.map((pers) => {
    return parseInt(pers.id);
  }).indexOf(parseInt(id));
  res.send(brocker.data[index]);
});

router.put('/brockers/', function (req, res, next) {
  const body = req.body;
  const id = body.id;
  const index = brocker.data.map((pers) => {
    return parseInt(pers.id);
  }).indexOf(parseInt(id));
  brocker.data[index] = body;
  updateBrocker();
  res.send(200);
});

router.post('/brockers/', function (req, res, next) {
  const body = req.body;
  body.money = 1000;
  body.id = brocker.maxId++;
  console.log(body);
  brocker.data.push(body);
  updateBrocker();
  res.send(body);
});

router.delete('/brockers/:id', function (req, res, next) {
  const id = req.params.id;
  brocker.data = brocker.data.filter(h => h.id != id );
  updateBrocker();
  res.send(200);
});

/////*********************/////


function updateStock() {
  fs.writeFile('./stock.json', JSON.stringify(stock), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

router.get('/stockes/', function (req, res, next) {
  res.send(stock);
});

router.get('/stockes/:id', function (req, res, next) {
  const id = req.params.id;
  const index = stock.data.map((pers) => {
    return parseInt(pers.id);
  }).indexOf(parseInt(id));
  res.send(stock.data[index]);
});

router.put('/stockes/', function (req, res, next) {
  const body = req.body;
  const id = body.id;
  const index = stock.data.map((pers) => {
    return parseInt(pers.id);
  }).indexOf(parseInt(id));
  stock.data[index] = body;
  updateStock();
  res.send(200);
});

router.post('/stockes/', function (req, res, next) {
  const body = req.body;
  body.disLaw = "U";
  body.maxStep = 10;
  body.amount = 10000;
  body.startPrice = 5;
  body.id = stock.maxId++;
  stock.data.push(body);
  updateStock();
  res.send(body);
});

router.delete('/stockes/:id', function (req, res, next) {
  const id = req.params.id;
  stock.data = stock.data.filter(h => h.id != id );
  updateStock();
  res.send(200);
});





module.exports = router;
