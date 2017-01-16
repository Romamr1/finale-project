'use strict';

import loginTemplate from './login.page.hbs';
import {elem} from '../createElement';
import {renderUser} from '../user/user';
import {renderAdmin} from '../admin/admin';
import Users from '../users.api';

export let curentUser = {};



function render(){
	Users
		.getUsers()
		.then(loginPage);	
}


function loginPage(users) {
	let mainPage = elem.getLink('container');
 	mainPage.innerHTML = loginTemplate();

 	let form = elem.getLink('loginForm');
 	form.addEventListener('submit', onSubmit);


	function onSubmit(event){
		event.preventDefault();

		let login = document.getElementById('login').value + '';
		let password = document.getElementById('password').value + '';
		let resalt = chekData(login, password);
		if (resalt.admin){	
			curentUser = resalt;		
			renderAdmin(resalt);
		} else if (resalt.name){
			curentUser = resalt;
			renderUser(resalt);
		} else {
			mainPage.innerHTML = resalt.message;
		}
	}



	function chekData(login, password){
		let message = '';
		let user = {};
		for (let i = users.length - 1; i >= 0; i--) {
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
	}

}



export default { render };