import Ember from 'ember';

export default Ember.Route.extend({
  model({contest_id}) {
    return this.store.findRecord('nfl-contest', contest_id);
  }
});
