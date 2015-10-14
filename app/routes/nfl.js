import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.query('nfl/contest', { equalTo: params.id }).then((contests) => {
      return contests.get('firstObject');
    });
  }
});
