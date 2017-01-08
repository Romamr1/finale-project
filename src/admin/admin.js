import adminTemplate from './admin.hbs';
import {elem} from '../createElement';
import Users from '../users.api';


let curentUser = {};


export function renderAdmin(user){
	
	if (user) {curentUser = user;}
	
	let container = elem.getLink('container');
	container.innerHTML = adminTemplate(curentUser);

	let showAddUserForm = elem.getLink('addNewUser');
	showAddUserForm.addEventListener('click',addUserForm);

	let showQuestionForm = elem.getLink('showQuestionForm');
	showQuestionForm.addEventListener('click',showForm);

	let addUser = elem.getLink('addUser_Form');
	addUser.addEventListener('submit',onAddUser);
	
};

function onAddUser(event){
	
	event.preventDefault();
	var login = elem.getLink("adminLogin").value;
	var password = elem.getLink("adminPassword").value;
	var isAdmin = elem.getLink("checkbox").checked;
	
	let newUser = {
		name: login,
		password: password,
		admin: isAdmin
	};
	
	Users
		.post_user(newUser)
		.then(onSuccess, onError);

	function onSuccess(data) {
		alert('success');
	}

	function onError(data){
		let invalidMessage = elem.getLink("invalidMessage");
		invalidMessage.innerHTML = data.message;
		invalidMessage.classList.add("red");
	}
	
}

function showForm(event){
	var addUserForm = document.getElementById('addQuestion');
	if (addUserForm.classList.contains("hiden")) {
		addUserForm.classList.remove("hiden");
	} else {
		addUserForm.classList.add("hiden");
	}		

}

function addUserForm(event){			
	
	var addUserForm = document.getElementById('addUser_Form');
	if (addUserForm.classList.contains("hiden")) {
		addUserForm.classList.remove("hiden");
	} else {
		addUserForm.classList.add("hiden");
	}		

}

