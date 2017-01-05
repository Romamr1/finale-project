var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

var users = [
		{
			name: 'vasia',
			password: 'vasia',
			admin: true	
		},
		{
			name: 'petia',
			password: 'petia',
			admin: false
		},
		{
			name: 'mashia',
			password: '12345',
			admin: false
		}
	];

app.get('/users', function (req, res) {
  res.send(users);
});

app.post('/users', function (req, res) {
  var user = {
    name: req.body.name
  };
  users.push(users);
  res.send(users);
});

var server = app.listen(3001, function () {
  console.log('backend started');
});
