import DS from 'ember-data';

export default DS.Model.extend({
  site: DS.attr('string'),
  startTime: Ember.computed.alias('proto.startTime'),
  weather: Ember.computed.alias('proto.weather'),
  awayTeam: DS.attr('string'),
  homeTeam: DS.attr('string'),
  ou: Ember.computed.alias('proto.ou'),
  line: Ember.computed.alias('proto.line'),
  ainactives: Ember.computed.alias('proto.ainactives'),
  aQB: DS.belongsTo('nfl/contest-player'),
  aRB: DS.belongsTo('nfl/contest-player'),
  aWR1: DS.belongsTo('nfl/contest-player'),
  aWR2: DS.belongsTo('nfl/contest-player'),
  aWR3: DS.belongsTo('nfl/contest-player'),
  aTE: DS.belongsTo('nfl/contest-player'),
  aK: DS.belongsTo('nfl/contest-player'),
  aD: DS.belongsTo('nfl/contest-player'),
  hinactives: Ember.computed.alias('proto.hinactives'),
  hQB: DS.belongsTo('nfl/contest-player'),
  hRB: DS.belongsTo('nfl/contest-player'),
  hWR1: DS.belongsTo('nfl/contest-player'),
  hWR2: DS.belongsTo('nfl/contest-player'),
  hWR3: DS.belongsTo('nfl/contest-player'),
  hTE: DS.belongsTo('nfl/contest-player'),
  hK: DS.belongsTo('nfl/contest-player'),
  hD: DS.belongsTo('nfl/contest-player'),
  proto: DS.belongsTo('nfl/matchup')
});
