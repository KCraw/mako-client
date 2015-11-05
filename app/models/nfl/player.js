import DS from 'ember-data';

export default DS.Model.extend({
  startTime: DS.attr('date'),
  fullName: DS.attr('string'),
  team: DS.attr('string'),
  type: DS.attr('string'),
  fdRatings: DS.attr(),
  fdActual: DS.attr('number'),
  dkRatings: DS.attr(),
  dkActual: DS.attr('number'),
  stats: DS.belongsTo('nfl/player-stats')
});
