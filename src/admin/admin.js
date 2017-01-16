'use strict';

import adminTemplate from './admin.hbs';
import {elem} from '../createElement';
import Users from '../users.api';
import answerTemplate from './answer.hbs';


let curentUser = {};

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

	let addAnswer = elem.getLink('addAnswer');
	addNewAnswer();
	addAnswer.addEventListener('click', addNewAnswer);

	let addNewQuestion = elem.getLink('addNewQuestion');
	addNewQuestion.addEventListener('click', addQuestion);
	
}

function addQuestion() {
	let newQuestion = {};
	newQuestion.question = elem.getLink('question').value;
	newQuestion.answer = {};
	newQuestion.rightAnswer = {};

	let validMessageQuestion = elem.getLink('validMessageQuestion');
	
	let answers = document.getElementsByName('answer');
	let answersCheck = document.getElementsByName('checkbox');
	let alphabet = 'abcdefghijklmnopqrstuvwxyz';

	for (let i =  0; i < answers.length; i++) {
		newQuestion.answer[alphabet[i]] = answers[i].value;
		newQuestion.rightAnswer[alphabet[i]] = answersCheck[i].checked;
	}

	Users
		.postQuestion(newQuestion)
		.then(onSuccessQuestion, onErrorQuestion);

	function onSuccessQuestion(data) {
		let questionPlase = elem.getLink('question');
		questionPlase.value = '';

		let removeAnswers = document.querySelectorAll('#addQuestion p');
		
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

