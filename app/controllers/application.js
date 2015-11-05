import Ember from 'ember';

export default Ember.Controller.extend({
	firebase: Ember.inject.service(),
	init() {
		this.get('firebase').onAuth((userAuth) => {
			if (!userAuth) {
				this.get('session').close();
			}
		});
	},
	authError: false,
	userSessionChanged: Ember.observer('session.isAuthenticated', function() {
		if (this.get('session.isAuthenticated')) {
			this.transitionToRoute('contests');
		} else {
			this.transitionToRoute('/');
		}
	}),
  actions: {
    dateNav(date) {
      let formatted = moment(date).format('YYYY-MM-DD');
      this.transitionToRoute('/contests/' + formatted);
    },
    signIn(email, password) {
      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password
      }).then((data) => {
        this.set('authError', false);
      }).catch((error) => {
        this.set('authError', true);
      });
    },
    signOut() {
      this.get('session').close();
    }
  }
});
