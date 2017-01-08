import { make_get_request } from './http-helpers';
import { make_post_request } from './http-helpers';

export default {
	get_users: ()=>make_get_request('/users'),
	get_question:()=> make_get_request('/questions'),
	post_user: data => make_post_request('/users', data)
}


