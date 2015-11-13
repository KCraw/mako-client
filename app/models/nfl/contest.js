import DS from 'ember-data';

export default DS.Model.extend({
  sport: 'nfl',
  site: DS.attr('string'),
  slot: DS.attr('string'),
  slotName: Ember.computed('slot', function() {
  	return this.get('slot').toUpperCase();
  }),
  startTime: DS.attr('date'),
  endTime: DS.attr('date'),
  meta: DS.belongsTo('nfl/contest-meta'),
  matchups: DS.hasMany('nfl/contest-matchup')
});
