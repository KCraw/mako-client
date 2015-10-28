import Ember from 'ember';

export function firstInitial([name, position]/*, hash*/) {
	if (position === 'D') {
		return '';
	}
	let names = name.split(/[ \.]+/).filter(Boolean);
	let r = '';
	names.forEach(function(name) {
		// Only initialize if the name starts with a letter
		// This initializes something like Jim (Butthead) to J. and not J.(.
		if(/[a-zA-Z]/.test(name.charAt(0))) {
			r += `${name.substring(0,1)}.`;
		}
	});
  return r;
}

export default Ember.Helper.helper(firstInitial);
