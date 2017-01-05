import adminTemplate from '../tpl/admin.hbs';
import {elem} from './createElement';

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
	
	loadXMLDoc();			
	
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

function loadXMLDoc(){

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
    console.log(JSON.parse(xmlhttp.responseText));
    }
  }
xmlhttp.open("Get","http://localhost:3001/users",true);
xmlhttp.send();
}