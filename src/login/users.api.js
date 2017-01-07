import { make_request } from './http-helpers';

export default {
	get_users: (cb)=>{
    	make_request('Get', '/users', cb);
	}
}
