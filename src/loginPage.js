import loginTemplate from '../tpl/login.hbs';
import {elem} from './createElement';
import {users} from './mockUsers';
import {renderUser} from "./user";
import {renderAdmin} from "./admin";

export var curentUser = {};
export function loginPage () {
	let mainPage = elem.getLink('container');
 	mainPage.innerHTML = loginTemplate();

 	let form =elem.getLink('loginForm');
 	form.addEventListener('submit', ONSubmit);
}

function ONSubmit(event){
	event.preventDefault();

	var login = document.getElementById("login").value + '';
	var password = document.getElementById("password").value + '';
	var resalt = chekData(login, password);
	if (resalt.admin){	
		curentUser = resalt;		
		renderAdmin(resalt);
	} else if (resalt.name){
		curentUser = resalt;
		renderUser(resalt);
	} else {
		container.innerHTML = resalt.message;
	}
}

function chekData(login, password){
	var message = '';
	var user = {};
	for (var i = users.length - 1; i >= 0; i--) {
		if ((users[i].name === login) && (users[i].password === password)){
			message = 'You successfully login!!! Welcome ' + users[i].name;
			user = users[i];
			break;
		} else {
			message = 'Check the login and password!!! You are not logged in!';
		}
	}		
	user.message = message;
	return user;		
};

