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

app.post('/questions', function (req, res) {
  
  const new_question = { 
	id: questions.length,
    question:req.body.question,
    answerType: req.body.answerType,
    answer:req.body.answer,
	rightAnswer:req.body.rightAnswer,
    curentCheck: ''
  };
  questions.push(new_question);
res.send(new_question);

});

app.post('/resalt', function (req, res) {
	
	for (let i=0;i<users.length;i++){
		console.log(req.body);
		if (req.body.name === users[i].name) {
			let resalt = req.body.resalt;
			users[i].resalt = ((users[i].resalt * users[i].count) + resalt)/(users[i].count + 1);
			users[i].count++;
			res.send(users[i]);
			break;
		}
	}

res.send();

});

app.post('/users', function (req, res) {
  

  const new_user = { 
	name: req.body.name,
	password: req.body.password,
	admin: req.body.admin
  };

  if (!new_user.name || !new_user.password){
	return res.status(400).send({ message: 'empty data' });
  }

  const is_existing_user = !!users.find(u=>u.name === new_user.name);
  if (is_existing_user){
	return res.status(400).send({ message: 'user already exists' });
  }
  
  users.push(new_user);
  res.send(new_user);
});

var server = app.listen(3000, function () {
  console.log('backend started');
});
