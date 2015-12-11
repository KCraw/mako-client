import DS from 'ember-data';

export default DS.Model.extend({
	fantasylogs: DS.attr(),
  gamelogs: DS.attr(),
  totals: DS.attr()
});