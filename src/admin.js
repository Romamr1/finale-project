import adminTemplate from '../tpl/admin.hbs';
import {elem} from './createElement';
import {loadXMLDoc} from './http';
loadXMLDoc();

let curentUser = {};


export function renderAdmin(user){
	
	if (user) {curentUser = user;}
	
	let container = elem.getLink('container');
	container.innerHTML = adminTemplate(curentUser);

	let showAddUserForm = elem.getLink('addNewUser');
	showAddUserForm.addEventListener('click',addUserForm);

	let showQuestionForm = elem.getLink('showQuestionForm');
	showQuestionForm.addEventListener('click',showForm);	
	
};

function showForm(event){

		
	console.log(loadXMLDoc.users);		
	
	var addUserForm = document.getElementById('addQuestion');
	if (addUserForm.classList.contains("hiden")) {
		addUserForm.classList.remove("hiden");
	} else {
		addUserForm.classList.add("hiden");
	}		

}

function addUserForm(event){			
	
	var addUserForm = document.getElementById('addUserForm');
	if (addUserForm.classList.contains("hiden")) {
		addUserForm.classList.remove("hiden");
	} else {
		addUserForm.classList.add("hiden");
	}		

}

