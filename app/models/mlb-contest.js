import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr('string'),
  startTime: DS.attr('date'),
  slotName: DS.attr('string'),
  playersList: DS.belongsTo('playerslist'),
  matchups: DS.hasMany('mlb-matchup')
});
