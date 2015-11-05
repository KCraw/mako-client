import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch((error) => {
    	this.transitionTo('/');
    });
  }
});
