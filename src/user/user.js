import userTemplate from './user.hbs';
import {elem} from '../createElement';
import {render} from "../question/render.question.page";



let curentUser = {};

export function renderUser(user){

	if (user) {curentUser = user;}
	let container = elem.getLink('container');
	container.innerHTML = userTemplate(curentUser);

	let start = elem.getLink("start");
	start.addEventListener('click', render);
};