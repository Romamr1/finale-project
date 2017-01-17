'use strict';

export let elem = {
	
	createAnswer: function(parent,data, name, value) {
		let li = document.createElement('li');
		let elem = document.createElement('input');
		let label = document.createElement('label');

		
		elem.setAttribute('id',value);
		elem.setAttribute('type',data.answerType);
		elem.setAttribute('name',name);
		label.innerText = data.answer[value];
		

		if (data.answerType === 'text'){

		} else {
			
			label.setAttribute('for',value);			
			elem.setAttribute('value',value);
			
			for (let i = 0; i < data.curentCheck.length; i++) {
				if (value === data.curentCheck[i]) {
					elem.setAttribute('checked','true');
				}
			}			
		}
		li.appendChild(elem);
		li.appendChild(label);
		parent.appendChild(li);
		
	},

	getLink: function(id) {

		let elem = document.getElementById(id);
		
		return elem;

	}

};