import loginTemplate from './login.page.hbs';
import {elem} from '../createElement';
//import {users} from './mockUsers';
import {renderUser} from "../user";
import {renderAdmin} from "../admin";

let users = [];

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

export function loadUser(){
   

  var xmlhttp;
  if (window.XMLHttpRequest)
    {// код для IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
    }
  else
    {// код для IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp.onreadystatechange=function()
    {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
      
      users = JSON.parse(xmlhttp.responseText);
      //console.log(users);
      loginPage ();
      
      }
    }
  xmlhttp.open("Get","/users",true);
  xmlhttp.send();
  
}


function render(){
	make_request('Get', '/users', function(data){
		users = data;
		loginPage();
	});
}


function make_request(method, endpoint, cb){
  const xmlhttp =new XMLHttpRequest();
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