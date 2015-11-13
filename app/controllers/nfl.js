import Ember from 'ember';

export default Ember.Controller.extend({
	mainComponent: Ember.computed('model.site', function() {
		return (this.get('model.site') === 'fanduel' && 'nfl-fd-optimizer') || (this.get('model.site') === 'draftkings' && 'nfl-dk-optimizer');
	}),
});
