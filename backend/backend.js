var users = require('./users');
var questions = require('./questions');;

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


var app = express();

app.use(express.static(__dirname + '/../'));

// app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/users', function (req, res) {
res.send(users);
});

app.get('/questions', function (req, res) {
res.send(questions);
});

app.post('/users', function (req, res) {
console.log('req', req.body);
res.send();

  //var user = {
    //name: req.body.name
  //};
  //var we = req.boby;
  //users.push(user);
  //res.send(we);
	//console.log('req',req.body);
});

var server = app.listen(3001, function () {
  console.log('backend started');
});
