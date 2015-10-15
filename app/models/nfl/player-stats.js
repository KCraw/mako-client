import DS from 'ember-data';

export default DS.Model.extend({
  gamelogs: DS.attr(),
  totals: DS.attr()
});
