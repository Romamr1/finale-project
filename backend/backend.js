var users = require('./users');
var questions = require('./questions');;

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


var app = express();

app.use(express.static(__dirname + '/../'));

app.use(cors());
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
  const new_user = { 
	name: req.body.name,
	password: req.body.password,
	admin: req.body.admin
  };

  const is_existing_user = !!users.find(u=>u.name === new_user.name);
  if (is_existing_user){
	return res.status(500).send();
  }
  
  users.push(user);
  res.send(user);
});

var server = app.listen(3000, function () {
  console.log('backend started');
});
