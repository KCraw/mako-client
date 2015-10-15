import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var self = this;
    return this.get('session').fetch().catch(function(error) {
      self.transitionTo('/');
    });
  },
  actions: {
    signIn: function(email, password, ref) {
      var self = this;

      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password
      }).then(function(data) {
        ref.set('hasError', false);
        self.transitionTo('contests');
      }).catch(function(error) {
        ref.set('hasError', true);
      });
    },
    signOut: function() {
      this.get("session").close();
      this.transitionTo('/');
    }
  }
});
