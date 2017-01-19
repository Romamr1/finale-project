'use strict';

import adminTemplate from './admin.hbs';
import {elem} from '../createElement';
import Users from '../users.api';
import answerTemplate from './answer.hbs';
import radioCheckboxTemplate from './answerRadioCheckbox.hbs';
import answerTextTemplate from './answerText.hbs';


let curentUser = {};
let answerType = '';

export function renderAdmin(user){
	
	if (user) {curentUser = user;}
	
	let container = elem.getLink('container');
	container.innerHTML = adminTemplate(curentUser);

	let showAddUserForm = elem.getLink('addNewUser');
	showAddUserForm.addEventListener('click',addUserForm);

	let showQuestionForm = elem.getLink('showQuestionForm');
	showQuestionForm.addEventListener('click',showForm);

	let addUser = elem.getLink('addUserForm');
	addUser.addEventListener('submit',onAddUser);

	

	let addNewQuestion = elem.getLink('addNewQuestion');
	addNewQuestion.addEventListener('click', onAddQuestion);

	let choseQuestionTypeForm = elem.getLink('choseQuestionTypeForm');
	choseQuestionTypeForm.addEventListener('submit', onQuestionTypeForm);

	let showUsersButton = elem.getLink('showUsers');
	showUsersButton.addEventListener('click', onShowUsers);

	let showQuestionButton = elem.getLink('showQuestion');
	showQuestionButton.addEventListener('click', onShowQuestion);
	
}


function onQuestionTypeForm(event) {
	event.preventDefault();
	
	let curetntQuestionType = document.querySelectorAll('#choseQuestionTypeForm label input');
	for (let i =  0; i < curetntQuestionType.length; i++) {
		if (curetntQuestionType[i].checked) {
			answerType = curetntQuestionType[i].id.substr(6);
			break;
		}
	}
	if (answerType) {
		let answerConteiner = elem.getLink('answerContainer');
		if (answerType === 'checkbox' || answerType === 'radio') {
			
			answerConteiner.innerHTML = radioCheckboxTemplate();
			let addAnswer = elem.getLink('addAnswer');
			addNewAnswer();
			addAnswer.addEventListener('click', addNewAnswer);
		}	else {
			answerConteiner.innerHTML = answerTextTemplate();
		}

		let addQuestion = elem.getLink('addQuestion');
		addQuestion.classList.remove('hiden');
	}
}

function onAddQuestion() {
	let newQuestion = {};
	newQuestion.question = elem.getLink('question').value;
	newQuestion.answer = {};
	newQuestion.rightAnswer = {};

	let validMessageQuestion = elem.getLink('validMessageQuestion');
	
	if (answerType === 'checkbox' || answerType === 'radio') {
		let answers = document.getElementsByName('answer');
		let answersCheck = document.getElementsByName('checkbox');
		let alphabet = 'abcdefghijklmnopqrstuvwxyz';

		for (let i =  0; i < answers.length; i++) {
			newQuestion.answer[alphabet[i]] = answers[i].value;
			newQuestion.rightAnswer[alphabet[i]] = answersCheck[i].checked;
		}
	} else {
		newQuestion.answer.a = 'Введите ответ';
		newQuestion.rightAnswer = elem.getLink('answerText').value;
		newQuestion.answerType = 'text';

	}

	Users
		.postQuestion(newQuestion)
		.then(onSuccessQuestion, onErrorQuestion);

	function onSuccessQuestion(data) {
		let questionPlase = elem.getLink('question');
		questionPlase.value = '';

		let removeAnswers = document.querySelectorAll('#answerContainer p');
		
		let answersConteiner = elem.getLink('answers');	

		for (let i =  1; i < removeAnswers.length; i++) {
		answersConteiner.removeChild(removeAnswers[i]);

		validMessageQuestion.classList.add('green');
		validMessageQuestion.innerHTML = 'Question successfully added!';
		
		}
		
		
	}

	function onErrorQuestion(data){	
		validMessageQuestion.classList.add('red');
		validMessageQuestion.innerHTML = 'Error';
	}
}

function addNewAnswer() {
	let newAnswer = document.createElement('p');
	newAnswer.innerHTML = answerTemplate();
	let answersConteiner = elem.getLink('answers');
	answersConteiner.appendChild(newAnswer);
}

function onAddUser(event){
	event.preventDefault();

	let validMessage = elem.getLink('validMessage');	
	
	let login = elem.getLink('adminLogin');
	let password = elem.getLink('adminPassword');
	let isAdmin = elem.getLink('checkbox');
	
	

	let newUser = {
		name: login.value,
		password: password.value,
		admin: isAdmin.checked
	};
	
	Users
		.postUser(newUser)
		.then(onSuccess, onError);

	function onSuccess(data) {
		clearForm();
		validMessage.innerHTML = 'User: ' + data.name + ' successfully added!';
		validMessage.classList.add('green');		
		
	}

	function onError(data){	
		clearForm();	
		validMessage.innerHTML = data.message;
		validMessage.classList.add('red');
	}

	function clearForm () {
		validMessage.classList.remove('red');
		validMessage.classList.remove('green');
		validMessage.innerHTML = '';
		login.value = '';
		password.value = '';
		isAdmin.checked = false;
	

	}
	
}

function showForm(event){
	let addUserForm = document.getElementById('addQuestionForm');
	addUserForm.classList.toggle('hiden');
	
}

function addUserForm(event){			
	
	let addUserForm = document.getElementById('addUserForm');
	addUserForm.classList.toggle('hiden');
}

function onShowUsers (event){			
	
	let showUsersContainer = document.getElementById('showUsersContainer');
	loadUsers();

	function loadUsers(){
		Users
			.getUsers()
			.then(renderUsers);	
	}

	function renderUsers(users) {
		showUsersContainer.classList.toggle('hiden');
		showUsersContainer.innerHTML = '';
		
		let table = createEl('table', showUsersContainer);

		let tr = createEl('tr', table);

		createEl('th', tr).innerHTML = 'Логин';
		createEl('th', tr).innerHTML = 'Пароль';
		createEl('th', tr).innerHTML = 'Админ';
		createEl('th', tr).innerHTML = 'Количество прохождений';
		createEl('th', tr).innerHTML = 'Средний показатель';

		

		function createEl(el, parent) {
			let element = document.createElement(el);
			parent.appendChild(element);
			return element;
		}

		for (let i =  0; i < users.length; i++) {

			let tr = createEl('tr', table);

			for (let key in users[i]) {
				let td = createEl('td', tr);
				td.innerHTML = users[i][key];				
			}						
		}
	}
}


function onShowQuestion (event){			
	
	let showQuestionContainer = document.getElementById('showQuestionContainer');
	loadQuestion();

	function loadQuestion () {	
		Users
			.getQuestion()
			.then(renderQuestion);	
	}

	function renderQuestion(questions) {
		showQuestionContainer.classList.toggle('hiden');
		showQuestionContainer.innerHTML = '';
		
		let table = createEl('table', showQuestionContainer);

		let tr = createEl('tr', table);

		createEl('th', tr).innerHTML = 'Номер';
		createEl('th', tr).innerHTML = 'Вопрос';
		createEl('th', tr).innerHTML = 'Тип ответа';
		createEl('th', tr).innerHTML = 'Ответ';
		

		

		function createEl(el, parent) {
			let element = document.createElement(el);
			parent.appendChild(element);
			return element;
		}

		
		for (let i =  0; i < questions.length; i++) {

			let tr = createEl('tr', table);
			let td1 = createEl('td', tr);
			td1.innerHTML = questions[i].id;

			let td2 = createEl('td', tr);
			td2.innerHTML = questions[i].question;

			let td3 = createEl('td', tr);
			td3.innerHTML = questions[i].answerType;			

			let td4 = createEl('td', tr);
			for (let key in questions[i].answer) {
				let p = createEl('p', td4);
				p.innerHTML = questions[i].answer[key] + ' : ' + questions[i].rightAnswer[key];				
			}						
		}
	}
}