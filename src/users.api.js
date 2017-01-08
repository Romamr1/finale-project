import { make_request } from './http-helpers';
import { make_post_request } from './http-helpers';

export default {
	get_users: (cb, err)=>{
    	make_request('/users', cb);
	},

	get_question: (cb, err)=>{
		make_request('/questions', cb);
	},

	post_user: (data, cb, err)=>{
		make_post_request('/users', data, cb, err);
	}
}


