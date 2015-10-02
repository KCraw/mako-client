import Ember from 'ember';

export default Ember.Route.extend({
  model({contest_id}) {
    return this.store.findRecord('nba-contest', contest_id);
  }
});
