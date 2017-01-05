import userTemplate from '../tpl/user.hbs';
import {elem} from './createElement';
import {renderQuestionPage} from "./render";

import {resoltQustion} from "./render";


let curentUser = {};

export function renderUser(user){

	if (user) {curentUser = user;}
	let container = elem.getLink('container');
	container.innerHTML = userTemplate(curentUser);

	let start = elem.getLink("start");
	start.addEventListener('click', renderQuestionPage);
};