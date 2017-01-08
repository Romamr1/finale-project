import { make_request } from './http-helpers';
import { make_post_request } from './http-helpers';

export default {
	get_users: (cb)=>{
    	make_request('Get', '/users', cb);
	},

	get_question: (cb)=>{
		make_request('Get', '/questions', cb);
	},

	post_user: (cb, data)=>{
		make_post_request('Post', '/users', cb, data);
	}
}


