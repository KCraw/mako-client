import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'nav',
	classNames: ['navbar-inverse', 'navbar-static-top'],
	actions: {
		toggleCollapse() {
			this.$('.collapse').toggleClass('in');
		}
	}
});
