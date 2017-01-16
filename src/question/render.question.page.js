'use strict';

import mainTemplate from './main.hbs';
import questionTemplate from './question.hbs';
import {elem} from '../createElement';
import {renderUser} from '../user/user';
import Users from '../users.api';

let questions = [];

export function render () {	
	Users
		.getQuestion()
		.then(renderQuestionPage);	
}


let resoltQustion = [0,0,0,0,0,0,0,0,0,0];



function renderQuestionPage (curentData) {	
	questions = curentData;
	let mainPage = elem.getLink('container');
 	mainPage.innerHTML = mainTemplate(); 
	
	let resoltButton = elem.getLink('endTest');
	resoltButton.addEventListener('click',endTest);
	
	for (let i = 1; i < 11; i++) {
		let button = elem.getLink('question' + i);
		button.addEventListener('click',OnClick(i));
	}
}

function endTest() {
 	let testResolt = 0;

 	for (let i =  0; i < resoltQustion.length; i++) {
 		testResolt += resoltQustion[i];
 	}
 	alert('Ваш результат: ' + testResolt + '/10');
 	renderUser();
 }

function OnClick(i) {
	return function() {
		renderQuestion(i-1);
		return i;
	};

}


function renderQuestion(j){
	
 	let questionText = elem.getLink('question');
 	questionText.innerHTML = questionTemplate(questions[j]);
 	
 	let ul = elem.getLink('answers');
 	ul.innerHTML = ''; 	
 	let form = elem.getLink('options');
	form.addEventListener('submit',OnSubmit);	
	
	for (let key in questions[j].answer)
	{			 	
 		elem.createAnswer(ul,questions[j],'name',key);
		
	}	
	
	function OnSubmit(event) {
		event.preventDefault();
		let answers = document.querySelectorAll('li input');		
		let resolt = 0;
		let count = 0;
		questions[j].curentCheck = '';
		for (let i = 0; i < answers.length; i++) {
				if (answers[i].checked === true) {

					for (let key in questions[j].rightAnswer) {
						if (answers[i].value === key) {
							questions[j].curentCheck += key;
						}
					}
					
				}
				
			}
		

		for (let key in questions[j].rightAnswer) {
			count++;

	 		for (let i = 0; i < answers.length; i++) {	 			
	 			if (answers[i].value === key) {
	 				if (answers[i].checked === questions[j].rightAnswer[key]){
	 					let curentButton = elem.getLink('question' + j);
	 					console.log(curentButton);
	 					curentButton.classList.add('btn-success');
	 					curentButton.classList.add('btn-success');
	 					resolt++;
	 				}
	 				break;
	 			}
	 		}
		}
		if(resolt === count){
			resoltQustion[j] = 1;			
		} else {
			
			resoltQustion[j] = 0;
		}		
	}	
}
