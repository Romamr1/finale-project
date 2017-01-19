'use strict';

import { makeGetRequest } from './http-helpers';
import { makePostRequest } from './http-helpers';

export default {
	getUsers: ()=>makeGetRequest('/users'),
	getQuestion:()=> makeGetRequest('/questions'),
	postUser: data => makePostRequest('/users', data),
	postQuestion: data => makePostRequest('/questions', data),
	postTestResalt: data => makePostRequest('/resalt', data)
};