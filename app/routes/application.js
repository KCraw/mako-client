import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    signIn: function(email, password, ref) {
      var self = this;

      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password
      }).then(function(data) {
        console.log(data.currentUser);
        ref.set('hasError', false);
        self.transitionTo('contests');
      }).catch(function(error) {
        console.log(error);
        ref.set('hasError', true);
      });
    },
    signOut: function() {
      this.get("session").close();
      this.transitionTo('/');
    }
  }
});
