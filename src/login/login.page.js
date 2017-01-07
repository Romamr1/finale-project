import loginTemplate from './login.page.hbs';
import {elem} from '../createElement';
import {renderUser} from "../user";
import {renderAdmin} from "../admin";


export var curentUser = {};






function render(){
	make_request('Get', '/users', function(data){
		loginPage(data);
	});
}


function loginPage(users) {	
	let mainPage = elem.getLink('container');
 	mainPage.innerHTML = loginTemplate();

 	let form = elem.getLink('loginForm');
 	form.addEventListener('submit', onSubmit);


	function onSubmit(event){
		event.preventDefault();

		var login = document.getElementById("login").value + '';
		var password = document.getElementById("password").value + '';
		var resalt = ch ekData(login, password);
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
	}

}


function make_request(method, endpoint, cb){
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange= onreadystatechange; 
  xmlhttp.open(method, endpoint, true);
  xmlhttp.send();

  function onreadystatechange(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      
      const data = JSON.parse(xmlhttp.responseText);
      cb(data);
      
    }
  }
}

export default { render };