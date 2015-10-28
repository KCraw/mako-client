import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch((error) => {
      this.transitionTo('/');
    });
  },
  actions: {
    dateNav(date) {
      let formatted = moment(date).format('YYYY-MM-DD');
      this.transitionTo('/contests/' + formatted);
    },
    signIn(email, password, ref) {
      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password
      }).then((data) => {
        ref.set('hasError', false);
        this.transitionTo('contests');
      }).catch((error) => {
        ref.set('hasError', true);
      });
    },
    signOut() {
      this.get("session").close();
      this.transitionTo('/');
    }
  }
});
