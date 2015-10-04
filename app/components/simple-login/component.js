import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['form-inline'],
  userEmail: '',
  userPassword: '',
  hasError: false,
  actions: {
    signIn(email, password) {
      this.set('userEmail', '');
      this.set('userPassword', '');
      this.sendAction('action', email, password, this);
    }
  }
});
