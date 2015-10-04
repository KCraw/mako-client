import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr('string'),
  startTime: DS.attr('date'),
  slotName: DS.attr('string'),
  gamesList: DS.hasMany('mlb-game', { async: true }),
  playersList: DS.hasMany('mlb-player', { async: true }),
  matchups: DS.hasMany('mlb-matchup', { async: true })
});
